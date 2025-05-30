// API 统一入口 - 可以在 Supabase 和原有 API 客户端之间切换
import { apiClient as originalApiClient } from './client';
import { supabaseApiClient } from './supabaseClient';

// 配置：是否使用 Supabase (可以通过环境变量控制)
const USE_SUPABASE = import.meta.env.VITE_USE_SUPABASE !== 'false'; // 默认使用 Supabase

// 导出统一的 API 客户端
export const apiClient = USE_SUPABASE ? supabaseApiClient : originalApiClient;

// 同时导出两个客户端，以防需要直接使用
export { originalApiClient, supabaseApiClient };

// 导出所有类型
export type * from './client'; 