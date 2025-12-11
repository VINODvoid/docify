'use client';

import { ConvexReactClient,Authenticated,Unauthenticated,AuthLoading } from 'convex/react';
import { ReactNode } from 'react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ClerkProvider, useAuth, SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { FullscreenLoader } from './fullscreen-loader';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#9DD1B3", // Lighter sage for dark mode
          colorBackground: "#171C1A",
          colorInputBackground: "#2A3331",
          colorInputText: "#F0F4F3",
          colorTextOnPrimaryBackground: "#FFFFFF",
          colorText: "#F0F4F3",
          colorTextSecondary: "#8A9C96",
          colorDanger: "#F87171",
          borderRadius: "1.2rem",
        },
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-white font-medium transition-all shadow-md",
          card: "bg-card shadow-xl border border-border/50",
          headerTitle: "text-foreground font-semibold",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "border-border hover:bg-muted/50 transition-all",
          formFieldInput:
            "border-border bg-input text-foreground focus:ring-2 focus:ring-primary/50",
          footerActionLink: "text-primary hover:text-primary/80 font-medium",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
        },
      }}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>
        {children}
        </Authenticated>
        <Unauthenticated>
          <div className='flex flex-col justify-center items-center min-h-screen'>
            <SignIn routing='hash'/>
          </div>
        </Unauthenticated>
        <AuthLoading>
         <FullscreenLoader label="Authenticating..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
