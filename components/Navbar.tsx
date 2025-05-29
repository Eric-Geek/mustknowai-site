"use client"

import { useState, useEffect } from "react"
import { Brain, Menu, X, Search, Sun, Moon, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home", description: "Discover AI tools" },
  { href: "/submit", label: "Submit AI", description: "Add your tool" },
  { href: "/blog", label: "Blog", description: "Latest AI news" },
  { href: "/pricing", label: "Pricing", description: "Our plans" },
]

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return router.pathname === "/"
    }
    return router.pathname.startsWith(href)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/20 bg-white/80 backdrop-blur-xl dark:border-slate-800/20 dark:bg-slate-950/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
            <div className="relative">
              <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                MustKnowAI
              </span>
              <div className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
                AI Tools Directory
              </div>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="search"
                placeholder="Search thousands of AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border-slate-200 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800",
                  isActive(link.href)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {link.label}
                <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} className="flex items-center space-x-2">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 p-0"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Login Button */}
            <Button size="sm" className="ml-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 md:hidden">
              <Search className="h-4 w-4" />
            </Button>

            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 p-0"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        MustKnowAI
                      </span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Mobile Search */}
                  <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="search"
                        placeholder="Search AI tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10"
                      />
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex flex-col space-y-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            isActive(link.href)
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                          )}
                        >
                          <span>{link.label}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{link.description}</span>
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    {/* Language Selector */}
                    <div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Language</div>
                      <div className="grid grid-cols-2 gap-2">
                        {languages.slice(0, 2).map((lang) => (
                          <Button key={lang.code} variant="outline" size="sm" className="justify-start">
                            <span className="mr-2">{lang.flag}</span>
                            {lang.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Login Button */}
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={() => setIsOpen(false)}>
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}