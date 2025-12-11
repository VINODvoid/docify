"use client"

import { motion } from "framer-motion"
import { FloatingPanel } from "@/components/ui/floating-panel"

export function EditorPreview() {
  return (
    <div className="relative">
      {/* Main Preview Card */}
      <FloatingPanel className="p-8 space-y-4">
        {/* Toolbar Mockup */}
        <div className="flex items-center gap-2 pb-4 border-b border-border/50">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/50" />
            <div className="h-3 w-3 rounded-full bg-accent/50" />
            <div className="h-3 w-3 rounded-full bg-primary/50" />
          </div>
          <div className="flex-1 flex items-center gap-2 ml-4">
            <div className="h-7 w-20 bg-muted rounded animate-pulse-soft" />
            <div className="h-7 w-16 bg-muted rounded animate-pulse-soft" />
            <div className="h-7 w-24 bg-muted rounded animate-pulse-soft" />
          </div>
        </div>

        {/* Document Content Mockup */}
        <div className="space-y-3 py-4">
          <div className="h-8 w-3/4 bg-primary/10 rounded" />
          <div className="h-4 w-full bg-muted/50 rounded" />
          <div className="h-4 w-full bg-muted/50 rounded" />
          <div className="h-4 w-2/3 bg-muted/50 rounded" />
          <div className="h-12 w-full bg-accent/20 rounded-lg mt-4" />
          <div className="h-4 w-full bg-muted/50 rounded" />
          <div className="h-4 w-5/6 bg-muted/50 rounded" />
        </div>
      </FloatingPanel>

      {/* Floating Collaboration Cursors */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute top-20 -left-4 flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-xs rounded-full shadow-lg"
      >
        <div className="h-2 w-2 rounded-full bg-white" />
        <span className="font-medium">Sarah</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 2.5,
          delay: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute bottom-32 -right-4 flex items-center gap-2 px-3 py-1.5 bg-accent text-foreground text-xs rounded-full shadow-lg"
      >
        <div className="h-2 w-2 rounded-full bg-primary" />
        <span className="font-medium">Alex</span>
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary rounded-full" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent rounded-full" />
      </div>
    </div>
  )
}
