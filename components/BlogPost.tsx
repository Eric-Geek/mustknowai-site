"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, ChevronLeft, ChevronRight, Clock } from "lucide-react"

interface BlogPostProps {
  title: string
  date: string
  readingTime: string
  heroImage?: string
  children: React.ReactNode
  prevPost?: {
    title: string
    href: string
  }
  nextPost?: {
    title: string
    href: string
  }
}

interface TocItem {
  id: string
  text: string
  level: number
}

const CodeBlock = ({ children, className, ...props }: any) => {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  const copyToClipboard = async () => {
    if (codeRef.current) {
      const text = codeRef.current.textContent || ""
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative group">
      <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 overflow-x-auto border">
        <code ref={codeRef} className={className} {...props}>
          {children}
        </code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-300"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

const InlineCode = ({ children, ...props }: any) => (
  <code
    className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
    {...props}
  >
    {children}
  </code>
)

const mdxComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 scroll-mt-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-gray-700 dark:text-gray-300 leading-7 mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-950/20 text-gray-700 dark:text-gray-300 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({ src, alt, ...props }: any) => (
    <div className="my-6">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={720}
        height={400}
        className="rounded-lg w-full h-auto"
        {...props}
      />
    </div>
  ),
  pre: CodeBlock,
  code: InlineCode,
  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
      {...props}
    >
      {children}
    </a>
  ),
}

const TableOfContents = ({ toc, activeId }: { toc: TocItem[]; activeId: string }) => {
  if (toc.length === 0) return null

  return (
    <Card className="p-4 sticky top-8">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeId === item.id
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-400"
                } ${item.level === 3 ? "ml-4" : ""}`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  )
}

export default function BlogPost({ title, date, readingTime, heroImage, children, prevPost, nextPost }: BlogPostProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Generate table of contents
    const headings = contentRef.current.querySelectorAll("h1, h2, h3")
    const tocItems: TocItem[] = []

    headings.forEach((heading, index) => {
      const id =
        heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || `heading-${index}`
      heading.id = id

      tocItems.push({
        id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.charAt(1)),
      })
    })

    setToc(tocItems)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -80% 0%" },
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [children])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Image */}
      {heroImage && (
        <div className="w-full mb-8">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt={title}
            width={1200}
            height={600}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
            priority
          />
        </div>
      )}

      <div className="lg:flex lg:gap-8 lg:max-w-6xl lg:mx-auto lg:px-4">
        {/* Main Content */}
        <div className="lg:flex-1">
          <div className="max-w-3xl mx-auto px-4">
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date)}</time>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime}</span>
                </div>
              </div>
            </header>

            <Separator className="mb-8" />

            {/* Content */}
            <div ref={contentRef} className="prose prose-lg max-w-none">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    components: { ...mdxComponents, ...(child.props.components || {}) },
                  })
                }
                return child
              })}
            </div>

            {/* Navigation */}
            {(prevPost || nextPost) && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  {prevPost ? (
                    <a
                      href={prevPost.href}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group"
                    >
                      <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      <div className="text-left">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Previous</div>
                        <div className="font-medium">{prevPost.title}</div>
                      </div>
                    </a>
                  ) : (
                    <div />
                  )}

                  {nextPost ? (
                    <a
                      href={nextPost.href}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group text-right"
                    >
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Next</div>
                        <div className="font-medium">{nextPost.title}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table of Contents Sidebar - Desktop Only */}
        <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <TableOfContents toc={toc} activeId={activeId} />
        </aside>
      </div>
    </article>
  )
}
