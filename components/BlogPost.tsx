"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, ChevronLeft, ChevronRight, Clock, ArrowLeft } from "lucide-react"
import { useRouter } from "next/router"
import Link from "next/link"

// 假设您将翻译 't' 作为 prop 传递
interface BlogPostProps {
  title: string
  date: string
  readingTime: string // 阅读时间本身可能是数字，后缀从翻译中获取
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
  t: { // 添加翻译 prop
    previousPost: string;
    nextPost: string;
    tableOfContents: string;
    readingTimeSuffix: string; // 例如 "分钟阅读"
    backButton: string;
  };
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
    <div className="relative group my-6"> {/* Added my-6 for spacing */}
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
        aria-label="Copy code" // SEO: Add aria-label
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
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 pl-4" {...props}> {/* Added pl-4 for better indentation */}
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 pl-4" {...props}> {/* Added pl-4 for better indentation */}
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
  img: ({ src, alt, ...props }: any) => ( // Ensure alt is always descriptive
    <div className="my-6">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || "Blog post image"} // SEO: Provide default if alt is missing
        width={720} // Provide appropriate default or fetched width
        height={400} // Provide appropriate default or fetched height
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
      // SEO: Add rel="noopener noreferrer" for external links if opening in new tab
    >
      {children}
    </a>
  ),
}

const TableOfContents = ({ toc, activeId, t }: { toc: TocItem[]; activeId: string; t: BlogPostProps['t'] }) => {
  if (toc.length === 0) return null

  return (
    <Card className="p-4 sticky top-24"> {/* Adjusted top for sticky header */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{t.tableOfContents}</h3>
      <nav aria-label={t.tableOfContents}> {/* SEO: Add aria-label */}
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

export default function BlogPost({ title, date, readingTime, heroImage, children, prevPost, nextPost, t }: BlogPostProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter(); // 初始化 router

  useEffect(() => {
    if (!contentRef.current) return

    const headings = contentRef.current.querySelectorAll("h1, h2, h3")
    const tocItems: TocItem[] = []

    headings.forEach((heading, index) => {
      const id =
        heading.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || `heading-${index}`
      heading.id = id // Ensure headings have IDs for TOC links

      tocItems.push({
        id,
        text: heading.textContent || "",
        level: Number.parseInt(heading.tagName.charAt(1)),
      })
    })

    setToc(tocItems)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -80% 0px" }, // Adjusted rootMargin
    )

    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
      observer.disconnect()
    }
  }, [children]) // Re-run if children change (e.g., dynamic content)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950 py-8"> {/* Added py-8 for top/bottom padding */}
      {heroImage && (
        <div className="w-full mb-8">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt={title} // SEO: 确保这是描述性的
            width={1200}
            height={600}
            className="w-full h-64 md:h-96 object-cover rounded-xl"
            priority
          />
        </div>
      )}

      <div className="lg:flex lg:gap-8 lg:max-w-6xl lg:mx-auto lg:px-4">
        <div className="lg:flex-1">
          <div className="max-w-3xl mx-auto px-4">
            <div className="mb-6">
              <Button variant="outline" onClick={() => router.back()} className="group text-sm">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                {t.backButton}
              </Button>
            </div>

            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h1>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <time dateTime={date}>{formatDate(date)}</time>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} {t.readingTimeSuffix}</span>
                </div>
              </div>
            </header>

            <Separator className="mb-8" />

            <div ref={contentRef} className="prose prose-lg dark:prose-invert max-w-none"> {/* Added dark:prose-invert */}
              {children}
            </div>

            {(prevPost || nextPost) && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center">
                  {prevPost ? (
                    <Link href={prevPost.href} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group">
                      <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                      <div className="text-left">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{t.previousPost}</div>
                        <div className="font-medium">{prevPost.title}</div>
                      </div>
                    </Link>
                  ) : (
                    <div /> // Placeholder for alignment
                  )}

                  {nextPost ? (
                    <Link href={nextPost.href} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors group text-right">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{t.nextPost}</div>
                        <div className="font-medium">{nextPost.title}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <div /> // Placeholder for alignment
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {toc.length > 0 && (
          <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0 mt-10 lg:mt-0"> {/* Added mt-10 for mobile, lg:mt-0 for desktop */}
            <TableOfContents toc={toc} activeId={activeId} t={t} />
          </aside>
        )}
      </div>
    </article>
  )
}