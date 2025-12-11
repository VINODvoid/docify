"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Users,
  Zap,
  Download,
  MessageSquare,
  LayoutTemplate,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "See changes as they happen. Multiple cursors, live updates.",
    gradient: "from-primary/20 to-accent/20",
    size: "large", // Takes 2 columns
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant loading, smooth editing, zero lag.",
    gradient: "from-accent/20 to-primary/20",
    size: "small",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "PDF, HTML, JSON, or plain text.",
    gradient: "from-primary/10 to-accent/10",
    size: "small",
  },
  {
    icon: MessageSquare,
    title: "Smart Comments",
    description: "Discuss without disrupting. Threaded conversations that stay organized.",
    gradient: "from-accent/20 to-primary/10",
    size: "large",
  },
  {
    icon: LayoutTemplate,
    title: "Beautiful Templates",
    description: "Start fast with proven formats.",
    gradient: "from-primary/20 to-primary/10",
    size: "small",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Smart suggestions, auto-formatting.",
    gradient: "from-accent/20 to-accent/10",
    size: "small",
  },
]

export function FeatureGrid() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="features" ref={ref} className="py-24 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-heading">
            Everything you need,{" "}
            <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features that feel effortless
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isLarge = feature.size === "large"

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-8 border border-border/50",
                  "bg-gradient-to-br",
                  feature.gradient,
                  "backdrop-blur-sm",
                  "hover:scale-[1.02] transition-all duration-300",
                  "hover:shadow-2xl hover:border-primary/50",
                  isLarge && "lg:col-span-2 lg:row-span-1"
                )}
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-2xl" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={cn(
                      "inline-flex p-4 rounded-2xl",
                      "bg-gradient-to-br from-primary/30 to-accent/30",
                      "group-hover:scale-110 transition-transform duration-300",
                      "shadow-lg"
                    )}>
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className={cn(
                      "font-semibold text-foreground",
                      isLarge ? "text-2xl md:text-3xl" : "text-xl"
                    )}>
                      {feature.title}
                    </h3>
                    <p className={cn(
                      "text-muted-foreground leading-relaxed",
                      isLarge ? "text-lg" : "text-base"
                    )}>
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-primary/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
