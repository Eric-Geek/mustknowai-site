"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image";
import { memo, useState } from "react";

interface ToolCardProps {
  logo: string
  name: string
  tagline: string
  category: string
  url: string
  variant?: "standard" | "compact"
}

// Use memo to optimize component and avoid unnecessary re-renders
export const ToolCard = memo(function ToolCard({ 
  logo, 
  name, 
  tagline, 
  category, 
  url, 
  variant = "standard" 
}: ToolCardProps) {
  const isStandard = variant === "standard"
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card
      className={`
        group cursor-pointer transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-lg h-full flex flex-col justify-between
        ${isStandard ? "shadow-md rounded-lg border-0" : "border border-border rounded-md shadow-none hover:shadow-md"}
      `}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center relative shrink-0">
              {!imageError ? (
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={`${name} Logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                  loading="lazy"
                  onError={handleImageError}
                />
              ) : (
                // Fallback display when image fails to load
                <div className="h-full w-full flex items-center justify-center text-xl font-bold bg-muted-foreground/10 text-muted-foreground">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight truncate" title={name}>{name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2" title={tagline}>{tagline}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardFooter className="pt-0 mt-auto">
        <Button
          variant={isStandard ? "default" : "outline"}
          size="sm"
          className={`
            w-full group-hover:shadow-sm transition-all duration-200
            ${isStandard ? "shadow-sm" : ""}
          `}
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <span>Try {name}</span>
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
});