"use client"

import { Brain, Github, Twitter, Mail } from "lucide-react"
import Link from "next/link"

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "AI Tools" },
  { href: "/submit", label: "Submit Tool" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
]

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://x.com/AIwithGeek", icon: Twitter, label: "Twitter" },
  { href: "mailto:contact@mustknowai.com", icon: Mail, label: "Email" },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-[1280px] px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                MustKnowAI
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Discover and share the best AI tools, making AI accessible to everyone. Explore the limitless possibilities of AI.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-500">
              © 2025 MustKnowAI. All rights reserved.
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Connect
            </h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{social.label}</span>
                  </Link>
                )
              })}
            </div>
            <div className="pt-4">
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Have a tool to suggest?{" "}
                <Link
                  href="/submit"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Submit it here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-xs text-slate-500 dark:text-slate-500">
              Built with ❤️ for the AI community
            </div>
            <div className="flex space-x-4 text-xs">
              <Link
                href="/privacy"
                className="text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-500 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 