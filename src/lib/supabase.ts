import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// 获取当前站点URL，用于认证重定向
let siteUrl = ''
if (typeof window !== 'undefined') {
  siteUrl = window.location.origin
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // 设置站点URL，用于认证重定向
    ...(siteUrl && {
      redirectTo: siteUrl,
      cookieOptions: {
        domain: window.location.hostname,
        path: '/',
        sameSite: 'lax',
        secure: window.location.protocol === 'https:'
      }
    })
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Export types for TypeScript
export type Database = {
  public: {
    Tables: {
      tools: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          image?: string
          stats?: string
          link?: string
          featured: boolean
          pricing: 'free' | 'freemium' | 'paid'
          tags?: string[]
          created_at: string
          updated_at: string
          views?: number
          rating?: number
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          image?: string
          stats?: string
          link?: string
          featured?: boolean
          pricing: 'free' | 'freemium' | 'paid'
          tags?: string[]
          created_at?: string
          updated_at?: string
          views?: number
          rating?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          image?: string
          stats?: string
          link?: string
          featured?: boolean
          pricing?: 'free' | 'freemium' | 'paid'
          tags?: string[]
          created_at?: string
          updated_at?: string
          views?: number
          rating?: number
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          icon?: string
          count: number
          color?: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string
          count?: number
          color?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          count?: number
          color?: string
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          tool_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tool_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tool_id?: string
          created_at?: string
        }
      }
    }
  }
}

export type Tool = Database['public']['Tables']['tools']['Row']
export type ToolInsert = Database['public']['Tables']['tools']['Insert']
export type ToolUpdate = Database['public']['Tables']['tools']['Update'] 