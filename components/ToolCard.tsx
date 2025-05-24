"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

interface ToolCardProps {
  logo: string
  name: string
  tagline: string
  category: string
  url: string
  variant?: "standard" | "compact"
}

export function ToolCard({ logo, name, tagline, category, url, variant = "standard" }: ToolCardProps) {
  const isStandard = variant === "standard"

  return (
    <Card
      className={`
        group cursor-pointer transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-lg
        ${isStandard ? "shadow-md rounded-lg border-0" : "border border-border rounded-md shadow-none hover:shadow-md"}
      `}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.parentElement!.innerHTML = name.charAt(0).toUpperCase()
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight truncate">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{tagline}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardFooter className="pt-0">
        <Button
          variant={isStandard ? "default" : "outline"}
          size="sm"
          className={`
            w-full group-hover:shadow-sm transition-all duration-200
            ${isStandard ? "shadow-sm" : ""}
          `}
          onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        >
          <span>Try {name}</span>
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// Example usage component
export default function ToolCardExample() {
  const tools = [
    {
      logo: "/placeholder.svg?height=40&width=40",
      name: "ChatGPT",
      tagline: "Conversational AI that can help with writing, analysis, and creative tasks",
      category: "Chat",
      url: "https://chat.openai.com",
    },
    {
      logo: "/placeholder.svg?height=40&width=40",
      name: "Midjourney",
      tagline: "AI-powered image generation for creative professionals",
      category: "Image",
      url: "https://midjourney.com",
    },
    {
      logo: "/placeholder.svg?height=40&width=40",
      name: "Claude",
      tagline: "AI assistant for analysis, writing, and complex reasoning",
      category: "Chat",
      url: "https://claude.ai",
    },
    {
      logo: "/placeholder.svg?height=40&width=40",
      name: "Runway",
      tagline: "AI video generation and editing tools for creators",
      category: "Video",
      url: "https://runwayml.com",
    },
  ]

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Tool Cards</h1>
        <p className="text-muted-foreground mb-8">
          Reusable components showcasing different AI tools with standard and compact variants.
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Standard Variant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} variant="standard" />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Compact Variant</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
