"use client"

import { ConvexClientProvider } from "@/components/convex-client-provider"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>
}
