"use client"

import * as React from "react"
import { Button, buttonVariants } from "./button"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

export interface AnimatedButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  ripple?: boolean
}

export function AnimatedButton({
  className,
  variant,
  size,
  children,
  ripple = true,
  ...props
}: AnimatedButtonProps) {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = React.useState(false)

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true)
      setTimeout(() => setIsRippling(false), 600)
    } else {
      setIsRippling(false)
    }
  }, [coords])

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 })
  }, [isRippling])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect()
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    props.onClick?.(e)
  }

  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:scale-105 active:scale-95",
        className
      )}
      variant={variant}
      size={size}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripple && isRippling && (
        <span
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: coords.x,
            top: coords.y,
            width: 20,
            height: 20,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </Button>
  )
}
