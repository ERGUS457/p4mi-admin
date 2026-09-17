"use client"

import { useEffect, useState } from "react"
import AddCpmiModal from "@/components/cpmi/add-cpmi-modal"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import Swal from "sweetalert2"
import { Edit, Trash2 } from "lucide-react"

export default function AgensiPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/agensi")
      const json = await res.json()
      setData(Array.isArray(json) ? json : [])
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

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Hapus agensi?",
      text: "Data yang dihapus tidak dapat dipulihkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    })
    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/agensi/${id}`, { method: "DELETE" })
        if (!res.ok) throw new Error((await res.json()).error)
        Swal.fire({ icon: "success", title: "Terhapus", confirmButtonColor: "#059669" })
        fetchData()
      } catch (err: any) {
        Swal.fire({ icon: "error", title: "Gagal", text: err.message, confirmButtonColor: "#059669" })
      }
    }
  }

  const handleEdit = (row: any) => {
    // reuse modal in edit mode (to be implemented)
    // for brevity we skip UI here
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manajemen Data Agensi</h1>
          <p className="text-sm text-slate-500">Tambah, ubah, hapus data agensi mitra.</p>
        </div>
        <AddCpmiModal onRefresh={fetchData} /> {/* reuse modal but you could create a separate Agensi modal later */}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 overflow-x-auto">
        {loading ? (
          <p className="text-center text-slate-500 py-8">Memuat data…</p>
        ) : data.length === 0 ? (
          <p className="text-center text-slate-500 py-8">Belum ada data agensi.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.alamat}</TableCell>
                  <TableCell>{item.kontak}</TableCell>
                  <TableCell className="flex space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:text-emerald-800" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800" title="Hapus">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
