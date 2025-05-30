# Supabase 后端设置指南

本文档详细说明如何为 MustKnowAI 网站配置 Supabase 后端。

## 🚀 快速开始

### 1. 环境变量配置

您的环境变量已经配置在 `.env` 文件中：

```env
VITE_SUPABASE_URL=https://jtjeoicivxltrdmxawtj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=https://jtjeoicivxltrdmxawtj.supabase.co/rest/v1
```

### 2. 数据库迁移

1. 登录您的 [Supabase 仪表盘](https://app.supabase.com)
2. 进入您的项目：`jtjeoicivxltrdmxawtj`
3. 点击左侧菜单的 "SQL Editor"
4. 复制 `supabase-migration.sql` 文件的所有内容
5. 粘贴到 SQL 编辑器中并运行

这将创建以下表：
- `tools` - AI工具信息
- `categories` - 工具分类
- `favorites` - 用户收藏
- `subscribers` - 邮件订阅
- `feedback` - 用户反馈

### 3. 行级安全策略 (RLS)

迁移脚本已经设置了适当的安全策略：

- **Tools**: 公开可读，认证用户可提交
- **Categories**: 公开可读
- **Favorites**: 用户只能管理自己的收藏
- **Subscribers**: 用户只能管理自己的订阅
- **Feedback**: 认证用户可提交反馈

## 📊 数据库架构

### Tools 表
```sql
create table public.tools (
  id uuid primary key,
  title text not null,
  description text not null,
  category text not null,
  image text,
  stats text default '0 users',
  link text,
  featured boolean default false,
  pricing text check (pricing in ('free', 'freemium', 'paid')),
  tags text[],
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  views integer default 0,
  rating numeric(3,2) default 0.0
);
```

### Categories 表
```sql
create table public.categories (
  id uuid primary key,
  name text not null unique,
  icon text,
  count integer default 0,
  color text,
  created_at timestamp with time zone
);
```

### Favorites 表
```sql
create table public.favorites (
  id uuid primary key,
  user_id uuid references auth.users(id),
  tool_id uuid references public.tools(id),
  created_at timestamp with time zone,
  unique(user_id, tool_id)
);
```

## 🔧 API 客户端使用

### 基本使用
```typescript
import { supabaseApiClient } from '@/api/supabaseClient';

// 获取所有工具
const tools = await supabaseApiClient.getTools();

// 搜索工具
const searchResults = await supabaseApiClient.searchTools('chatbot');

// 按分类获取工具
const chatbots = await supabaseApiClient.getToolsByCategory('chatbot');

// 获取特色工具
const featured = await supabaseApiClient.getFeaturedTools();
```

### 用户相关功能
```typescript
// 切换收藏状态
const result = await supabaseApiClient.toggleFavorite(toolId);

// 获取用户收藏
const favorites = await supabaseApiClient.getUserFavorites();

// 增加工具浏览次数
await supabaseApiClient.incrementToolViews(toolId);
```

### 提交功能
```typescript
// 提交新工具
const result = await supabaseApiClient.submitTool({
  title: 'New AI Tool',
  description: 'Description of the tool',
  category: 'chatbot',
  website: 'https://example.com',
  pricing: 'free',
  tags: ['ai', 'chatbot']
});

// 提交反馈
const feedback = await supabaseApiClient.sendFeedback({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Feature Request',
  message: 'Would love to see...'
});
```

## 🔍 搜索和筛选

API 客户端支持多种筛选选项：

```typescript
const tools = await supabaseApiClient.getTools({
  category: 'chatbot',
  search: 'AI assistant',
  pricing: 'free',
  featured: true,
  page: 1,
  limit: 20
});
```

## 📈 性能优化

### 数据库索引
迁移脚本包含了以下索引以提高查询性能：

- 分类索引：`tools_category_idx`
- 特色工具索引：`tools_featured_idx`
- 价格索引：`tools_pricing_idx`
- 创建时间索引：`tools_created_at_idx`
- 浏览次数索引：`tools_views_idx`
- 评分索引：`tools_rating_idx`
- 标签索引：`tools_tags_idx`
- 全文搜索索引：`tools_search_idx`

### 缓存策略
React Query 已配置为缓存 API 响应：

```typescript
// 查询键包含所有筛选参数以确保正确的缓存失效
queryKey: ['discover-tools', category, subcategories, searchQuery, sortBy, filters]
```

## 🔐 认证 (可选)

如果需要用户认证功能，可以使用 Supabase Auth：

```typescript
import { supabase } from '@/lib/supabase';

// 用户注册
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});

// 用户登录
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// 检查用户状态
const { data: { user } } = await supabase.auth.getUser();
```

## 🚀 部署配置

### Cloudflare Pages 环境变量

在 Cloudflare Pages 的项目设置中添加以下环境变量：

1. 进入 Cloudflare Pages 仪表盘
2. 选择您的项目
3. 进入 "Settings" → "Environment variables"
4. 添加以下变量：

```
VITE_SUPABASE_URL=https://jtjeoicivxltrdmxawtj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL=https://jtjeoicivxltrdmxawtj.supabase.co/rest/v1
```

### 构建配置

确保您的 `vite.config.ts` 包含正确的环境变量处理：

```typescript
export default defineConfig({
  // ... 其他配置
  define: {
    'process.env': process.env
  }
});
```

## 🛠️ 开发工具

### Supabase CLI (可选)

如果您想在本地开发中使用 Supabase CLI：

```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录
supabase login

# 连接到项目
supabase link --project-ref jtjeoicivxltrdmxawtj
```

### 数据库管理

您可以通过以下方式管理数据库：

1. **Supabase 仪表盘**: 最简单的方式，提供 GUI 界面
2. **SQL 编辑器**: 直接执行 SQL 查询
3. **Table Editor**: 可视化编辑表数据
4. **API 日志**: 监控 API 调用

## 📚 下一步

1. **运行迁移脚本**设置数据库表
2. **测试 API 连接**确保环境变量正确
3. **添加示例数据**或开始添加真实的 AI 工具
4. **配置用户认证**（如果需要）
5. **设置数据备份**和监控

## 🆘 故障排除

### 常见问题

1. **连接错误**: 检查环境变量是否正确设置
2. **权限错误**: 确保行级安全策略配置正确
3. **查询超时**: 检查数据库索引是否已创建
4. **认证问题**: 确保使用正确的 anon 密钥

### 有用的 SQL 查询

```sql
-- 检查表结构
\d+ public.tools

-- 查看所有工具
SELECT * FROM public.tools LIMIT 10;

-- 检查分类统计
SELECT name, count FROM public.categories ORDER BY count DESC;

-- 查看最受欢迎的工具
SELECT title, views FROM public.tools ORDER BY views DESC LIMIT 10;
```

## 📞 支持

如果您遇到任何问题，请检查：
1. [Supabase 文档](https://supabase.com/docs)
2. [Supabase 社区](https://github.com/supabase/supabase/discussions)
3. 项目的 GitHub Issues 