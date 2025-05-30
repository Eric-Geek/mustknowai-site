-- Supabase database migration for MustKnowAI site
-- 创建AI工具目录网站所需的数据库表

-- 启用必要的扩展
create extension if not exists "uuid-ossp";

-- 创建categories表
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  icon text,
  count integer default 0,
  color text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 创建tools表
create table public.tools (
  id uuid default uuid_generate_v4() primary key,
  title text not null unique,
  description text not null,
  category text not null,
  image text,
  stats text default '0 users',
  link text,
  featured boolean default false,
  pricing text check (pricing in ('free', 'freemium', 'paid')) default 'free',
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  views integer default 0,
  rating numeric(3,2) default 0.0
);

-- 创建favorites表 (用户收藏)
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  tool_id uuid references public.tools(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, tool_id)
);

-- 创建subscribers表 (邮件订阅)
create table public.subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unsubscribed_at timestamp with time zone,
  active boolean default true
);

-- 创建feedback表 (用户反馈)
create table public.feedback (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'new' check (status in ('new', 'in_progress', 'resolved'))
);

-- 创建索引以提高查询性能
create index tools_category_idx on public.tools (category);
create index tools_featured_idx on public.tools (featured);
create index tools_pricing_idx on public.tools (pricing);
create index tools_created_at_idx on public.tools (created_at desc);
create index tools_views_idx on public.tools (views desc);
create index tools_rating_idx on public.tools (rating desc);
create index tools_tags_idx on public.tools using gin (tags);

-- 全文搜索索引 (只包含标题和描述)
create index tools_search_idx on public.tools using gin (
  to_tsvector('english', title || ' ' || description)
);

-- 创建更新updated_at的函数
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 为tools表创建自动更新updated_at的触发器
create trigger update_tools_updated_at
  before update on public.tools
  for each row
  execute function update_updated_at_column();

-- 创建增加浏览次数的函数
create or replace function increment_views(tool_id uuid)
returns void as $$
begin
  update public.tools 
  set views = views + 1 
  where id = tool_id;
end;
$$ language plpgsql;

-- 创建更新分类计数的函数
create or replace function update_category_count()
returns trigger as $$
begin
  -- 当插入新工具时
  if TG_OP = 'INSERT' then
    -- 先检查分类是否存在，如果不存在则创建
    insert into public.categories (name, count)
    values (new.category, 1)
    on conflict (name) 
    do update set count = categories.count + 1;
    return new;
  end if;
  
  -- 当删除工具时
  if TG_OP = 'DELETE' then
    update public.categories 
    set count = greatest(count - 1, 0)
    where name = old.category;
    return old;
  end if;
  
  -- 当更新工具分类时
  if TG_OP = 'UPDATE' and old.category != new.category then
    -- 减少旧分类计数
    update public.categories 
    set count = greatest(count - 1, 0)
    where name = old.category;
    
    -- 增加新分类计数
    insert into public.categories (name, count)
    values (new.category, 1)
    on conflict (name) 
    do update set count = categories.count + 1;
    
    return new;
  end if;
  
  return coalesce(new, old);
end;
$$ language plpgsql;

-- 为tools表创建分类计数触发器
create trigger update_category_count_trigger
  after insert or update or delete on public.tools
  for each row
  execute function update_category_count();

-- 设置行级安全策略 (RLS)
alter table public.tools enable row level security;
alter table public.categories enable row level security;
alter table public.favorites enable row level security;
alter table public.subscribers enable row level security;
alter table public.feedback enable row level security;

-- 创建策略: tools表公开可读，认证用户可以提交
create policy "Tools are viewable by everyone" on public.tools
  for select using (true);

create policy "Authenticated users can insert tools" on public.tools
  for insert with check (auth.role() = 'authenticated');

-- 创建策略: categories表公开可读
create policy "Categories are viewable by everyone" on public.categories
  for select using (true);

-- 创建策略: favorites表只有用户自己可以访问
create policy "Users can view own favorites" on public.favorites
  for select using (auth.uid() = user_id);

create policy "Users can insert own favorites" on public.favorites
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own favorites" on public.favorites
  for delete using (auth.uid() = user_id);

-- 创建策略: subscribers表用户只能管理自己的订阅
create policy "Users can manage own subscription" on public.subscribers
  for all using (auth.jwt() ->> 'email' = email);

-- 创建策略: feedback表认证用户可以提交
create policy "Authenticated users can submit feedback" on public.feedback
  for insert with check (auth.role() = 'authenticated');

-- 插入一些示例分类数据
insert into public.categories (name, icon, color, count) values
  ('chatbot', '💬', 'bg-blue-500', 0),
  ('image', '🎨', 'bg-purple-500', 0),
  ('writing', '✍️', 'bg-green-500', 0),
  ('productivity', '⚡', 'bg-yellow-500', 0),
  ('video', '🎥', 'bg-red-500', 0),
  ('audio', '🎵', 'bg-indigo-500', 0),
  ('code', '👨‍💻', 'bg-cyan-500', 0),
  ('business', '💼', 'bg-orange-500', 0),
  ('education', '🎓', 'bg-pink-500', 0)
on conflict (name) do nothing;

-- 插入一些示例工具数据 (可选)
insert into public.tools (title, description, category, pricing, featured, tags) values
  ('ChatGPT', 'Advanced AI chatbot for conversations and assistance', 'chatbot', 'freemium', true, '{"conversation", "ai-assistant", "openai"}'),
  ('DALL-E 2', 'AI image generation from text descriptions', 'image', 'paid', true, '{"image-generation", "ai-art", "openai"}'),
  ('Grammarly', 'AI-powered writing assistant and grammar checker', 'writing', 'freemium', false, '{"writing", "grammar", "proofreading"}'),
  ('Notion AI', 'AI-powered productivity and note-taking tool', 'productivity', 'freemium', false, '{"notes", "productivity", "ai-writing"}'),
  ('Runway ML', 'AI video editing and generation platform', 'video', 'freemium', true, '{"video-editing", "ai-video", "creative"}')
on conflict (title) do nothing;

-- 完成迁移脚本
-- 注意：请在Supabase仪表盘的SQL编辑器中运行此脚本 