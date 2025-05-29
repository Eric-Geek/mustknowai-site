'use client'

import * as React from 'react'

// 简化的ThemeProvider，避免依赖问题
export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode,
  attribute?: string,
  defaultTheme?: string,
  enableSystem?: boolean,
  disableTransitionOnChange?: boolean
}) {
  return <>{children}</>
} 