"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

export default function LandingLayout({
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
          colorPrimary: "#88C0A0", // Sage green
          colorBackground: "#171C1A", // Dark background
          colorInputBackground: "#2A3331", // Secondary dark
          colorInputText: "#F0F4F3", // Light text
          colorTextOnPrimaryBackground: "#FFFFFF",
          colorText: "#F0F4F3",
          colorTextSecondary: "#8A9C96", // Muted
          colorDanger: "#F87171",
          borderRadius: "1.2rem",
        },
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-white font-medium transition-all",
          card: "bg-card shadow-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "border-border hover:bg-muted transition-colors",
          formFieldInput:
            "border-border bg-input text-foreground focus:ring-primary",
          footerActionLink: "text-primary hover:text-primary/80",
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
