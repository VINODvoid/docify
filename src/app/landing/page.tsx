import { LandingNavbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { StatsSection } from "@/components/landing/stats-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { LandingFooter } from "@/components/landing/footer"

export const metadata = {
  title: 'Docify - Beautiful Document Editor with Real-Time Collaboration',
  description: 'Create, edit, and collaborate on documents in real-time. Beautiful design, powerful features, completely free.',
  openGraph: {
    title: 'Docify - Document Editor',
    description: 'Real-time collaborative document editing',
  },
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <LandingNavbar />
      <HeroSection />
      <FeatureGrid />
      <StatsSection />
      <PricingSection />
      <LandingFooter />
    </main>
  )
}
