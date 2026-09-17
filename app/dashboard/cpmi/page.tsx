"use client"

import { useEffect, useState } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import AddCpmiModal from "@/components/cpmi/add-cpmi-modal"

export default function CpmiPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/cpmi")
      const json = await res.json()
      if (Array.isArray(json)) {
        setData(json)
      } else {
        setData([])
      }
    } catch (e) {
      console.error(e)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Data CPMI</h1>
          <p className="text-sm text-slate-500">Kelola pendaftaran dan dokumen calon pekerja migran</p>
        </div>
        <AddCpmiModal onRefresh={fetchData} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 overflow-x-auto">
        {loading ? (
          <p className="text-center text-slate-500 py-8">Memuat data…</p>
        ) : data.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Belum ada data CPMI.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIK</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Negara Tujuan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nik}</TableCell>
                  <TableCell>{item.namaLengkap}</TableCell>
                  <TableCell>{item.telepon}</TableCell>
                  <TableCell>{item.negaraTujuan}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
