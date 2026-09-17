"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

export default function AddCpmiModal({ onRefresh }: { onRefresh: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError("")

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

      setIsOpen(false)
      reset()
      onRefresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
      >
        + Tambah CPMI
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex justify-center items-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-xl my-8">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Tambah Data CPMI Baru</h2>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">NIK (16 Digit)</label>
                  <input
                    {...register("nik", { required: "NIK Wajib diisi", minLength: 16, maxLength: 16 })}
                    className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="16 digit NIK"
                  />
                  {errors.nik && <span className="text-xs text-red-500">NIK harus 16 digit</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    {...register("namaLengkap", { required: true })}
                    className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Nama sesuai KTP"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nomor Telepon</label>
                  <input
                    {...register("telepon", { required: true })}
                    className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Negara Tujuan</label>
                  <input
                    {...register("negaraTujuan", { required: true })}
                    className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Malaysia, Taiwan, dll"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50"
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
