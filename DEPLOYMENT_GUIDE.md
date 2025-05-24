# 部署指南

## 🚀 部署到 Vercel (推荐)

### 1. 使用 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署
vercel

# 部署到生产环境
vercel --prod
```

### 2. 使用 GitHub 集成
1. 推送代码到 GitHub
2. 在 Vercel 中连接 GitHub 仓库
3. 自动部署

## 🌐 部署到 Cloudflare Pages

### 1. 使用 Cloudflare Pages
```bash
# 构建项目
pnpm build

# 使用 @cloudflare/next-on-pages
pnpm exec next-on-pages
```

### 2. GitHub 集成
- 连接 GitHub 仓库
- 构建命令: `pnpm exec next-on-pages`
- 输出目录: `.vercel/output/static`

## 📦 部署到 Netlify

### 1. 构建设置
- 构建命令: `pnpm build && pnpm export`
- 发布目录: `out`

### 2. next.config.mjs 修改
```javascript
// 添加到 next.config.mjs
output: 'export',
trailingSlash: true,
images: {
  unoptimized: true
}
```

## 🔒 环境变量

无论部署到哪个平台，确保设置以下环境变量：

```env
# 生产环境
NODE_ENV=production

# 网站 URL (根据部署平台调整)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## ✅ 部署前检查清单

- [ ] `pnpm build` 构建成功
- [ ] 所有图标文件存在于 `public/icons/`
- [ ] 翻译文件完整 (`locales/zh/` & `locales/en/`)
- [ ] 环境变量配置正确
- [ ] SEO 信息完整

## 🎯 推荐部署平台

| 平台 | 优势 | 适用场景 |
|------|------|----------|
| **Vercel** | Next.js 原生支持，零配置 | 个人项目、企业网站 |
| **Cloudflare Pages** | 全球 CDN，免费额度大 | 高流量网站 |
| **Netlify** | 易用，静态部署 | 简单静态网站 |

---

🎉 **您的 MustKnowAI 网站现在可以成功部署了！** 