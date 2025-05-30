import { Tool } from '@/data/tools';

// API类型定义
export interface SubmitToolData {
  title: string;
  description: string;
  category: string;
  website: string;
  tags: string[];
  pricing: 'free' | 'freemium' | 'paid';
  contact?: string;
}

export interface GetToolsParams {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
  pricing?: string;
  featured?: boolean;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class APIClient {
  private baseURL: string;
  private cache: Map<string, { data: any; timestamp: number }>;
  private cacheTimeout: number = 5 * 60 * 1000; // 5分钟缓存

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.cache = new Map();
  }

  private async request<T>(
    endpoint: string, 
    options?: RequestInit
  ): Promise<T> {
    const cacheKey = `${endpoint}-${JSON.stringify(options)}`;
    const cached = this.cache.get(cacheKey);
    
    // 检查缓存（仅对GET请求使用缓存）
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout && (!options?.method || options.method === 'GET')) {
      return cached.data;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      // 只缓存成功的GET请求
      if (!options?.method || options.method === 'GET') {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }
      
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // 清除缓存
  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // 获取工具列表
  async getTools(params?: GetToolsParams): Promise<APIResponse<Tool[]>> {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request<APIResponse<Tool[]>>(`/tools?${queryString}`);
  }

  // 获取单个工具详情
  async getTool(id: string): Promise<APIResponse<Tool>> {
    return this.request<APIResponse<Tool>>(`/tools/${id}`);
  }

  // 获取特色工具
  async getFeaturedTools(): Promise<APIResponse<Tool[]>> {
    return this.request<APIResponse<Tool[]>>('/tools/featured');
  }

  // 获取热门工具
  async getHotTools(): Promise<APIResponse<Tool[]>> {
    return this.request<APIResponse<Tool[]>>('/tools/hot');
  }

  // 按分类获取工具
  async getToolsByCategory(category: string, params?: Omit<GetToolsParams, 'category'>): Promise<APIResponse<Tool[]>> {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request<APIResponse<Tool[]>>(`/tools/category/${category}?${queryString}`);
  }

  // 搜索工具
  async searchTools(query: string, params?: Omit<GetToolsParams, 'search'>): Promise<APIResponse<Tool[]>> {
    const searchParams = { ...params, search: query };
    const queryString = new URLSearchParams(searchParams as any).toString();
    return this.request<APIResponse<Tool[]>>(`/tools/search?${queryString}`);
  }

  // 提交工具
  async submitTool(data: SubmitToolData): Promise<APIResponse<{ id: string }>> {
    return this.request<APIResponse<{ id: string }>>('/tools/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // 获取分类列表
  async getCategories(): Promise<APIResponse<{ name: string; count: number }[]>> {
    return this.request<APIResponse<{ name: string; count: number }[]>>('/categories');
  }

  // 获取统计信息
  async getStats(): Promise<APIResponse<{
    totalTools: number;
    totalCategories: number;
    totalUsers: number;
    recentSubmissions: number;
  }>> {
    return this.request<APIResponse<{
      totalTools: number;
      totalCategories: number;
      totalUsers: number;
      recentSubmissions: number;
    }>>('/stats');
  }

  // 订阅邮件列表
  async subscribe(email: string): Promise<APIResponse<{ success: boolean }>> {
    return this.request<APIResponse<{ success: boolean }>>('/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // 发送反馈
  async sendFeedback(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<APIResponse<{ success: boolean }>> {
    return this.request<APIResponse<{ success: boolean }>>('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// 创建API客户端实例
export const apiClient = new APIClient(
  import.meta.env.VITE_API_URL || 'https://api.mustknowai.com'
);

// 导出默认实例
export default apiClient; 