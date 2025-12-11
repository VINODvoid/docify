"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function RootAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      afterSignInUrl="/home"
      afterSignUpUrl="/home"
      signInUrl="/landing"
      signUpUrl="/landing"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#9DD1B3",
          colorBackground: "#171C1A",
          colorInputBackground: "#2A3331",
          colorInputText: "#F0F4F3",
          colorTextOnPrimaryBackground: "#FFFFFF",
          colorText: "#F0F4F3",
          colorTextSecondary: "#8A9C96",
          colorDanger: "#F87171",
          borderRadius: "1.2rem",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
