import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"

// Next.js 15+ App Router requires params to be a Promise
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cpmi = await prisma.cpmi.findUnique({
    where: { id },
    include: { agensi: true, jadwal: true, dokumen: true },
  })
  if (!cpmi) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 })
  return NextResponse.json(cpmi)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await request.json()
  try {
    const updated = await prisma.cpmi.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.cpmi.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
