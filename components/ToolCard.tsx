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
  // 如果工具名称和标语需要翻译，从页面级别传递翻译后的文本
  // translatedName?: string;
  // translatedTagline?: string;
  // translatedCategory?: string;
}

// 使用 memo 优化组件，避免不必要的重新渲染
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
                // 图片加载失败时的备用显示
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
            {/* 这里的文本也应该来自翻译文件，例如 t.tryTool.replace('{toolName}', name) */}
            <span>尝试 {name}</span>
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
});

// 优化示例组件
export default function ToolCardExample() {
  const tools = [
    {
      logo: "/icons/tools/chatgpt-icon.png",
      name: "ChatGPT",
      tagline: "对话式AI，可帮助完成写作、分析和创意任务",
      category: "聊天",
      url: "https://chat.openai.com",
    },
    {
      logo: "/icons/tools/midjourney-icon.jpg",
      name: "Midjourney",
      tagline: "为创意专业人士提供AI驱动的图像生成",
      category: "图像",
      url: "https://midjourney.com",
    },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI 工具卡片</h1>
        <p className="text-muted-foreground mb-8">
          可重用组件，展示具有标准和紧凑型变体的不同AI工具。
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">标准样式</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} variant="standard" />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">紧凑样式</h2>
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