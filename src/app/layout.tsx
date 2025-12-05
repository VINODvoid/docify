import type { Metadata } from "next";
import {Inter } from "next/font/google";
import "./globals.css";
import {NuqsAdapter} from "nuqs/adapters/next/app"
import { ConvexClientProvider } from "@/components/convex-client-provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Docify - Document Editor",
  description: "A simple and elegant document editor.",
  icons:{
    icon:"/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <NuqsAdapter>
          <ConvexClientProvider>
        {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
