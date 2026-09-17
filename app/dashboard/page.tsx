import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const totalCpmi = await prisma.cpmi.count()
  const byStatus = await prisma.cpmi.groupBy({
    by: ['status'],
    _count: { id: true },
  })

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
        <ul>
          {byStatus.map((item) => (
            <li key={item.status} className="flex justify-between border-b py-2">
              <span>{item.status}</span>
              <span className="font-bold">{item._count.id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
