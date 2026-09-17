import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, Clock, ShieldCheck } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let totalCpmi = 0
  let byStatus: any[] = []

  try {
    totalCpmi = await prisma.cpmi.count()
    byStatus = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count 
      FROM "Cpmi" 
      GROUP BY status
    `
  } catch (error) {
    console.error("Database not ready or tables missing:", error)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Utama</h1>
          <p className="text-sm text-slate-500">Ringkasan operasional dan statistik penempatan CPMI</p>
        </div>
        <div className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl text-sm font-medium border border-emerald-200">
          Sistem Online
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total CPMI Terdaftar</p>
            <h3 className="text-3xl font-bold text-slate-900">{totalCpmi}</h3>
          </div>
        </div>
      </div>

      {/* Table / Status Section */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Statistik Tahapan CPMI</h2>
        {byStatus.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <p>Belum ada data status CPMI di dalam database.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {byStatus.map((item: any) => (
              <div key={item.status} className="py-3 flex justify-between items-center">
                <span className="font-medium text-slate-700">{item.status}</span>
                <span className="bg-slate-100 text-slate-900 px-3 py-1 rounded-lg text-sm font-bold">
                  {item.count.toString()} Orang
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
