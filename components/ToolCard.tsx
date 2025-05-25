"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { ExternalLink, Star } from "lucide-react"
import { memo } from "react";
import SmartIcon from "./SmartIcon";

interface ToolCardProps {
  logo: string
  name: string
  tagline: string
  category: string
  url: string
  variant?: "standard" | "compact"
  featured?: boolean
  rating?: number
}

// Use memo to optimize component and avoid unnecessary re-renders
export const ToolCard = memo(function ToolCard({ 
  logo, 
  name, 
  tagline, 
  category, 
  url, 
  variant = "standard",
  featured = false,
  rating
}: ToolCardProps) {
  const isStandard = variant === "standard"

  return (
    <Card
      className={`
        group relative overflow-hidden transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-blue-500/10 h-full flex flex-col justify-between
        border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50
        hover:-translate-y-2 hover:scale-[1.02]
        ${featured ? "ring-2 ring-blue-500/20 shadow-lg" : "shadow-md"}
        ${isStandard ? "rounded-2xl" : "rounded-xl"}
      `}

    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      {/* Gradient overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className={`
            relative rounded-2xl overflow-hidden bg-white shadow-lg ring-1 ring-gray-200/50
            dark:bg-gray-800 dark:ring-gray-700/50 shrink-0
            transition-transform duration-300 group-hover:scale-110
            ${isStandard ? "w-16 h-16" : "w-12 h-12"}
          `}>
            <SmartIcon
              name={name}
              type="tool"
              fallbackSrc={logo}
              size={isStandard ? 64 : 48}
              priority={featured}
              alt={`${name} Logo`}
              className="p-1.5"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg leading-tight truncate text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {name}
              </h3>
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {rating}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {tagline}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="pt-0 mt-auto relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <Badge 
            variant="secondary" 
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-0 font-medium"
          >
            {category}
          </Badge>
        </div>
        
        <Button
          variant={isStandard ? "default" : "outline"}
          size="sm"
          className={`
            w-full font-semibold transition-all duration-300 group/button
            ${isStandard 
              ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-white border-0" 
              : "border-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
            }
          `}
          asChild
        >
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <span>Try {name}</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
});