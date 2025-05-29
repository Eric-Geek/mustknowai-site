# MustKnowAI Discovery Hub

一个基于 Vite + React + shadcn/ui 的AI工具发现平台。

## 项目特性

- ⚡ Vite 构建工具，快速开发体验
- ⚛️ React 18 + TypeScript
- 🎨 shadcn/ui 组件库
- 💅 Tailwind CSS 样式框架
- 🔄 React Router 路由管理
- 📱 响应式设计
- 🌗 支持暗色/亮色主题切换

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **UI组件**: shadcn/ui + Radix UI
- **路由**: React Router
- **状态管理**: TanStack Query
- **图标**: Lucide React

## 项目结构

```
src/
├── components/          # React组件
│   ├── ui/             # shadcn/ui组件
│   ├── Header.tsx      # 头部组件
│   ├── HeroSection.tsx # 英雄区域
│   ├── Footer.tsx      # 底部组件
│   └── ...
├── pages/              # 页面组件
│   ├── Index.tsx       # 首页
│   └── NotFound.tsx    # 404页面
├── lib/                # 工具函数
│   └── utils.ts        # 通用工具函数
├── hooks/              # 自定义Hook
├── App.tsx             # 根组件
└── main.tsx            # 应用入口
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:8080 运行

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 迁移说明

此项目已从 Next.js 成功迁移到 Vite + React：

- ✅ 保留了所有 shadcn/ui 组件和样式配置
- ✅ 将 Next.js 路由系统改为 React Router
- ✅ 更新了构建配置和依赖
- ✅ 保持了原有的设计风格和功能
- ✅ 改进了开发体验和构建速度

## 部署

项目可以部署到任何支持静态网站的平台，如：
- Vercel
- Netlify  
- GitHub Pages
- Cloudflare Pages

构建后的文件将生成在 `dist/` 目录中。

## 许可证

此项目基于 MIT 许可证开源。 