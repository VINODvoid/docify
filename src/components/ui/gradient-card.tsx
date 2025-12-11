import * as React from "react"
import { cn } from "@/lib/utils"

export interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function GradientCard({
  className,
  children,
  ...props
}: GradientCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.02]",
        "bg-gradient-to-br from-primary via-accent to-primary",
        className
      )}
      {...props}
    >
      <div className="relative rounded-2xl bg-background p-6 h-full">
        {children}
      </div>
    </div>
  )
}
