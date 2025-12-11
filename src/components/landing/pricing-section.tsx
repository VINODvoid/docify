"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free Plan",
    description: "Best for personal use",
    price: "$0",
    period: "/14 Days",
    features: [
      "14 Day Full Access",
      "Connect up to 2 Data Sources",
      "Basic AI Reports",
      "Community support",
      "Basic templates",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro Plan",
    description: "Best for growing business",
    price: "$12",
    period: "/Month",
    features: [
      "Customizable Dashboards",
      "Unlimited Data Sources",
      "Advanced AI Analysis",
      "Priority support",
      "Advanced templates",
      "Team collaboration",
      "API access",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise Plan",
    description: "Best for families",
    price: "$49",
    period: "/Month",
    features: [
      "Dedicated AI Model Training",
      "Priority Support & Account Manager",
      "Full Security Compliance",
      "Custom integrations",
      "Advanced analytics",
      "White-label options",
    ],
    cta: "Get Started",
    popular: false,
  },
]

export function PricingSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="pricing" ref={ref} className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-heading">
            Pick Your Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're testing our capabilities or ready to scale, we have a plan to match your needs.{" "}
            <span className="text-foreground/60">Start free, upgrade anytime.</span>
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1 bg-gradient-to-r from-accent to-primary text-background text-xs font-semibold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={cn(
                  "relative h-full rounded-2xl p-8 border transition-all duration-300",
                  "hover:scale-[1.02] hover:shadow-2xl",
                  plan.popular
                    ? "bg-gradient-to-br from-primary/5 via-accent/5 to-background border-primary/50 shadow-xl"
                    : "bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30"
                )}
              >
                {/* Glow effect for popular plan */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 blur-xl opacity-50" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                      <span className="text-muted-foreground text-lg">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                        </div>
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    asChild
                    variant={plan.popular ? "gradient" : "outline"}
                    size="lg"
                    className={cn(
                      "w-full group",
                      !plan.popular && "hover:bg-primary/10"
                    )}
                  >
                    <Link href="/home" className="flex items-center justify-center gap-2">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            All plans include 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
