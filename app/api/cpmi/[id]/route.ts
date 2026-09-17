import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const cpmi = await prisma.cpmi.findUnique({
    where: { id: params.id },
    include: { agensi: true, jadwal: true, dokumen: true },
  })
  if (!cpmi) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 })
  return NextResponse.json(cpmi)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  try {
    const updated = await prisma.cpmi.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(updated)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.cpmi.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
