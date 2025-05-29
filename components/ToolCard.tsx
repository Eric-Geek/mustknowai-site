"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface ToolCardProps {
  logo: string
  name: string
  description: string
  url: string
}

export default function ToolCard({ logo, name, description, url }: ToolCardProps) {
  return (
    <div className="transition-transform hover:scale-[1.03] shadow-card rounded-card">
      <Card className="h-full dark:bg-neutral-800 bg-white border-0 rounded-card">
        <CardHeader className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src={logo}
                alt={`${name} logo`}
                width={48}
                height={48}
                className="rounded object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight mb-2">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardFooter>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            asChild
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Visit
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}