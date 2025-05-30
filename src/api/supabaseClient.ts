import { supabase, type Tool, type ToolInsert, type ToolUpdate } from '@/lib/supabase';
import type { GetToolsParams, APIResponse, SubmitToolData } from './client';

class SupabaseAPIClient {
  private async handleSupabaseResponse<T>(
    queryBuilder: any
  ): Promise<APIResponse<T>> {
    try {
      const { data, error, count } = await queryBuilder;
      
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Database operation failed');
      }

      return {
        data: data as T,
        success: true,
        message: 'Success',
        ...(count !== null && count !== undefined && {
          pagination: {
            total: count || 0,
            page: 1,
            limit: 20,
            totalPages: Math.ceil((count || 0) / 20)
          }
        })
      };
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // 获取工具列表
  async getTools(params?: GetToolsParams): Promise<APIResponse<Tool[]>> {
    let query = supabase
      .from('tools')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // 分类筛选
    if (params?.category && params.category !== 'all') {
      query = query.eq('category', params.category);
    }

    // 搜索筛选
    if (params?.search) {
      const searchTerm = params.search.toLowerCase();
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
    }

    // 价格筛选
    if (params?.pricing) {
      query = query.eq('pricing', params.pricing);
    }

    // 特色筛选
    if (params?.featured !== undefined) {
      query = query.eq('featured', params.featured);
    }

    // 分页
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    return this.handleSupabaseResponse(query);
  }

  // 获取单个工具详情
  async getTool(id: string): Promise<APIResponse<Tool>> {
    const query = supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .single();

    return this.handleSupabaseResponse(query);
  }

  // 获取特色工具
  async getFeaturedTools(): Promise<APIResponse<Tool[]>> {
    const query = supabase
      .from('tools')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(10);

    return this.handleSupabaseResponse(query);
  }

  // 获取热门工具
  async getHotTools(): Promise<APIResponse<Tool[]>> {
    const query = supabase
      .from('tools')
      .select('*')
      .order('views', { ascending: false })
      .limit(10);

    return this.handleSupabaseResponse(query);
  }

  // 按分类获取工具
  async getToolsByCategory(category: string, params?: Omit<GetToolsParams, 'category'>): Promise<APIResponse<Tool[]>> {
    return this.getTools({ ...params, category });
  }

  // 搜索工具
  async searchTools(query: string, params?: Omit<GetToolsParams, 'search'>): Promise<APIResponse<Tool[]>> {
    return this.getTools({ ...params, search: query });
  }

  // 提交工具
  async submitTool(data: SubmitToolData): Promise<APIResponse<{ id: string }>> {
    const toolData: ToolInsert = {
      title: data.title,
      description: data.description,
      category: data.category,
      link: data.website,
      pricing: data.pricing,
      tags: data.tags,
      featured: false,
      stats: '0 users'
    };

    const response = await this.handleSupabaseResponse(
      supabase
        .from('tools')
        .insert(toolData)
        .select('id')
        .single()
    );
    
    return {
      ...response,
      data: { id: (response.data as any)?.id || 'unknown' }
    };
  }

  // 获取分类列表
  async getCategories(): Promise<APIResponse<{ name: string; count: number }[]>> {
    return this.handleSupabaseResponse(
      supabase
        .from('categories')
        .select('name, count')
        .order('count', { ascending: false })
    );
  }

  // 获取统计信息
  async getStats(): Promise<APIResponse<{
    totalTools: number;
    totalCategories: number;
    totalUsers: number;
    recentSubmissions: number;
  }>> {
    // 并行获取各种统计信息
    const [toolsCount, categoriesCount] = await Promise.all([
      supabase.from('tools').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true })
    ]);

    const stats = {
      totalTools: toolsCount.count || 0,
      totalCategories: categoriesCount.count || 0,
      totalUsers: 10000, // 模拟数据
      recentSubmissions: 50 // 模拟数据
    };

    return {
      data: stats,
      success: true,
      message: 'Success'
    };
  }

  // 订阅邮件列表 (可以创建一个单独的表)
  async subscribe(email: string): Promise<APIResponse<{ success: boolean }>> {
    // 这里可以实现邮件订阅逻辑
    // 例如插入到 subscribers 表
    console.log('Subscribe email:', email);
    
    return {
      data: { success: true },
      success: true,
      message: 'Subscribed successfully'
    };
  }

  // 发送反馈 (可以创建一个 feedback 表)
  async sendFeedback(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<APIResponse<{ success: boolean }>> {
    // 这里可以实现反馈存储逻辑
    console.log('Feedback received:', data);
    
    return {
      data: { success: true },
      success: true,
      message: 'Feedback sent successfully'
    };
  }

  // 增加工具浏览次数
  async incrementToolViews(toolId: string): Promise<void> {
    try {
      await supabase.rpc('increment_views', { tool_id: toolId });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }

  // 用户收藏相关功能 (需要用户认证)
  async toggleFavorite(toolId: string): Promise<APIResponse<{ isFavorited: boolean }>> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to add favorites');
    }

    // 检查是否已收藏
    const { data: existingFavorite } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('tool_id', toolId)
      .single();

    if (existingFavorite) {
      // 移除收藏
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId);
      
      return {
        data: { isFavorited: false },
        success: true,
        message: 'Removed from favorites'
      };
    } else {
      // 添加收藏
      await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          tool_id: toolId
        });
      
      return {
        data: { isFavorited: true },
        success: true,
        message: 'Added to favorites'
      };
    }
  }

  // 获取用户收藏列表
  async getUserFavorites(): Promise<APIResponse<Tool[]>> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return {
        data: [],
        success: true,
        message: 'No user authenticated'
      };
    }

    const response = await this.handleSupabaseResponse(
      supabase
        .from('favorites')
        .select(`
          tools (*)
        `)
        .eq('user_id', user.id)
    );
    
    return {
      ...response,
      data: (response.data as any)?.map((fav: any) => fav.tools) || []
    };
  }
}

// 创建Supabase API客户端实例
export const supabaseApiClient = new SupabaseAPIClient();

// 导出默认实例
export default supabaseApiClient; 