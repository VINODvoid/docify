"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { FullscreenLoader } from "@/components/fullscreen-loader"

export default function RootPage() {
  const router = useRouter()
  const { isLoaded, userId } = useAuth()

  useEffect(() => {
    if (!isLoaded) return

    // If user is authenticated, redirect to dashboard
    if (userId) {
      router.push("/home")
    } else {
      // If not authenticated, redirect to landing page
      router.push("/landing")
    }
  }, [isLoaded, userId, router])

  return <FullscreenLoader label="Loading..." />
}
