"use server"

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const agensi = await prisma.agensi.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(agensi)
}

export async function POST(request: Request) {
  const { nama, alamat, kontak } = await request.json()
  if (!nama || !alamat || !kontak) {
    return NextResponse.json({ error: 'Semua field wajib diisi' }, { status: 400 })
  }
  const newAgensi = await prisma.agensi.create({
    data: { nama, alamat, kontak },
  })
  return NextResponse.json(newAgensi, { status: 201 })
}
