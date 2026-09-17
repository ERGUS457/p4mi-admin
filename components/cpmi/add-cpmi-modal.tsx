"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { UserPlus, X } from "lucide-react"

export default function AddCpmiModal({ onRefresh }: { onRefresh: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)

    try {
      const res = await fetch("/api/cpmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Gagal menambah CPMI")
      }

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data CPMI baru berhasil ditambahkan.',
        confirmButtonColor: '#059669',
      })

      setIsOpen(false)
      reset()
      onRefresh()
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.message,
        confirmButtonColor: '#059669',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition shadow-sm flex items-center space-x-2 cursor-pointer"
      >
        <UserPlus className="h-4 w-4" />
        <span>Tambah CPMI</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border border-slate-100 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-100 p-2 rounded-full transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-900">Formulir Pendaftaran CPMI</h2>
              <p className="text-xs text-slate-500 mt-1">Masukkan data diri calon pekerja migran dengan benar.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">NIK (16 Digit)</label>
                <input
                  {...register("nik", { required: "NIK Wajib diisi", minLength: 16, maxLength: 16 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="Contoh: 617101... (16 digit)"
                />
                {errors.nik && <span className="text-xs text-red-500 mt-1 block">NIK harus tepat 16 digit</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">Nama Lengkap</label>
                <input
                  {...register("namaLengkap", { required: true })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="Nama lengkap sesuai KTP"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">No. Telepon / WhatsApp</label>
                  <input
                    {...register("telepon", { required: true })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">Negara Tujuan</label>
                  <input
                    {...register("negaraTujuan", { required: true })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition"
                    placeholder="Malaysia, Taiwan, dll"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold shadow-sm transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
