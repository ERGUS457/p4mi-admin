import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let totalCpmi = 0
  let byStatus: any[] = []

  try {
    totalCpmi = await prisma.cpmi.count()
    // Using $queryRaw to safely bypass complex groupBy type issues
    byStatus = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count 
      FROM "Cpmi" 
      GROUP BY status
    `
  } catch (error) {
    console.error("Database not ready or tables missing:", error)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard P4MI</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total CPMI</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {totalCpmi}
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Statistik Per Status</h2>
        {byStatus.length === 0 ? (
          <p className="text-slate-500 text-sm">Belum ada data atau tabel database belum diinisialisasi.</p>
        ) : (
          <ul>
            {byStatus.map((item: any) => (
              <li key={item.status} className="flex justify-between border-b py-2">
                <span>{item.status}</span>
                <span className="font-bold">{item.count.toString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
