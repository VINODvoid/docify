"use client"

import { ConvexClientProvider } from "@/components/convex-client-provider"

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>
}
