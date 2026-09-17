"use client"

import { useEffect, useState } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import AddCpmiModal from "@/components/cpmi/add-cpmi-modal"
import Swal from "sweetalert2"
import { Edit, Trash2 } from "lucide-react"

export default function CpmiPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/cpmi")
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
      title: "Hapus data?",
      text: "Data yang dihapus tidak dapat dipulihkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    })
    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/cpmi/${id}`, { method: "DELETE" })
        if (!res.ok) throw new Error((await res.json()).error)
        Swal.fire({ icon: "success", title: "Terhapus", confirmButtonColor: "#059669" })
        fetchData()
      } catch (err: any) {
        Swal.fire({ icon: "error", title: "Gagal", text: err.message, confirmButtonColor: "#059669" })
      }
    }
  }

  const handleEdit = (row: any) => {
    // open modal with prefilled data; reuse AddCpmiModal in 'edit' mode
    // For simplicity we just reuse the same modal but with initial values
    // Implemented in AddCpmiModal as optional prop `initialData` and `mode="edit"`
    // Here we set a temporary state to pass to modal
    setEditData(row)
    setIsEditOpen(true)
  }

  // State for edit modal
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editData, setEditData] = useState<any>(null)

  const closeEdit = () => {
    setIsEditOpen(false)
    setEditData(null)
  }

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
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.nik}</TableCell>
                  <TableCell>{item.namaLengkap}</TableCell>
                  <TableCell>{item.telepon}</TableCell>
                  <TableCell>{item.negaraTujuan}</TableCell>
                  <TableCell>{item.status}</TableCell>
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

      {/* Edit Modal (reuse AddCpmiModal) */}
      {isEditOpen && editData && (
        <AddCpmiModal
          onRefresh={() => { fetchData(); closeEdit(); }}
          initialData={editData}
          mode="edit"
        />
      )}
    </div>
  )
}
