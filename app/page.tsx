"use client"

import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { UserPlus, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (data: any) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      if (res?.error) throw new Error(res.error)
      Swal.fire({
        icon: "success",
        title: "Login berhasil",
        confirmButtonColor: "#059669",
      })
      router.push("/dashboard")
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal login",
        text: err.message,
        confirmButtonColor: "#059669",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          <Lock className="h-5 w-5 mr-2 text-emerald-600" />
          Masuk Administrator
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              {...register("email", { required: "Email wajib diisi" })}
              type="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              {...register("password", { required: "Password wajib diisi" })}
              type="password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-sm font-medium transition"
          >
            <UserPlus className="inline-block mr-2 h-4 w-4" />
            Masuk
          </button>
        </form>
      </div>
    </div>
  )
}
