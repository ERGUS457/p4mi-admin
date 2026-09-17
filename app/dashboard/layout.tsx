"use client"

import Sidebar from "@/components/Sidebar"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex justify-end items-center p-4 border-b border-slate-200 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
