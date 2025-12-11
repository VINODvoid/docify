"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface StatCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function StatCounter({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
  className,
  ...props
}: StatCounterProps) {
  const [count, setCount] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          const start = 0
          const end = value
          const increment = end / (duration / 16)

          let current = start
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  return (
    <div
      ref={ref}
      className={cn("text-4xl font-bold tabular-nums", className)}
      {...props}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}
