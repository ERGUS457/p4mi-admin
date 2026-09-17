"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSession } from "next-auth/react"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const sess = await getSession()
      if (!sess) {
        router.replace("/")
      } else {
        setSession(sess)
        setLoading(false)
      }
    })()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Memuat...</p>
      </div>
    )
  }

  return <>{children}</>
}
