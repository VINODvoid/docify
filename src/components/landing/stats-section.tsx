"use client"

import { StatCounter } from "@/components/ui/stat-counter"
import { useInView } from "react-intersection-observer"

const stats = [
  { value: 10000, suffix: "+", label: "Documents Created" },
  { value: 500, suffix: "+", label: "Active Teams" },
  { value: 99.9, suffix: "%", label: "Uptime" },
  { value: 24, suffix: "/7", label: "Support" },
]

export function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  return (
    <section ref={ref} className="py-24 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center space-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {inView && (
                <>
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl md:text-5xl font-bold text-primary"
                  />
                  <p className="text-sm md:text-base text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
