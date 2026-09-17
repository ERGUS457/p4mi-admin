import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const where: any = {}
    if (search) {
      where.OR = [
        { namaLengkap: { contains: search, mode: 'insensitive' } },
        { nik: { contains: search, mode: 'insensitive' } },
        { pasporNo: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (status) {
      where.status = status
    }

    const cpmiList = await prisma.cpmi.findMany({
      where,
      include: {
        agensi: true,
        jadwal: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(cpmiList)
  } catch (error) {
    console.error('Error fetching CPMI:', error)
    return NextResponse.json({ error: 'Gagal memuat data CPMI' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      nik,
      kk,
      namaLengkap,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      alamatAsal,
      pasporNo,
      telepon,
      negaraTujuan,
      sektor,
      agensiId,
      jadwalId,
    } = body

    // Validasi dasar
    if (!nik || nik.length !== 16) {
      return NextResponse.json({ error: 'NIK wajib diisi dan harus 16 digit' }, { status: 400 })
    }
    if (!namaLengkap || !telepon || !negaraTujuan) {
      return NextResponse.json({ error: 'Field wajib belum lengkap' }, { status: 400 })
    }

    const newCpmi = await prisma.cpmi.create({
      data: {
        nik,
        kk: kk || '',
        namaLengkap,
        tempatLahir: tempatLahir || '',
        tanggalLahir: new Date(tanggalLahir || Date.now()),
        jenisKelamin: jenisKelamin || 'L',
        alamatAsal: alamatAsal || '',
        pasporNo: pasporNo || null,
        telepon,
        negaraTujuan,
        sektor: sektor || 'Formal',
        agensiId: agensiId || null,
        jadwalId: jadwalId || null,
        status: 'PENDAFTARAN',
      },
    })

    return NextResponse.json(newCpmi, { status: 201 })
  } catch (error: any) {
    console.error('Error creating CPMI:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'NIK sudah terdaftar' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Gagal menyimpan data CPMI' }, { status: 500 })
  }
}
