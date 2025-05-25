"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "dots" | "pulse" | "bars"
  className?: string
}

export default function LoadingSpinner({ 
  size = "md", 
  variant = "default",
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-blue-500 rounded-full animate-pulse",
              size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s"
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn(
          "bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse",
          sizeClasses[size]
        )} />
      </div>
    )
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-center justify-center space-x-1", className)}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "bg-blue-500 animate-pulse",
              size === "sm" ? "w-1 h-4" : size === "md" ? "w-1.5 h-6" : "w-2 h-8"
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: "0.8s"
            }}
          />
        ))}
      </div>
    )
  }

  // Default spinner
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-500",
        sizeClasses[size]
      )} />
    </div>
  )
} 