import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function FloatingPanel({
  className,
  children,
  ...props
}: FloatingPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-background/95 backdrop-blur-md",
        "shadow-lg border border-border/50",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
