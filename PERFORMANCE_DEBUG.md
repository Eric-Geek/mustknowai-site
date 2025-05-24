# 网站性能优化和调试指南

## 🚀 已完成的性能优化

### 1. 图片加载优化
- ✅ 添加了 `loading="lazy"` 懒加载
- ✅ 添加了 `placeholder="blur"` 模糊占位符
- ✅ 使用 Next.js Image 组件自动优化
- ✅ 添加了图片加载失败的备用方案

### 2. 组件渲染优化
- ✅ 使用 `React.memo()` 避免不必要的重新渲染
- ✅ 使用 `useMemo()` 缓存静态数据
- ✅ 使用 `useCallback()` 优化事件处理函数

### 3. 语言切换功能修复
- ✅ 改进了路由逻辑
- ✅ 添加了错误处理和备用方案
- ✅ 增强了用户界面反馈

## 🛠️ 如何调试语言切换问题

### 1. 检查浏览器控制台
打开浏览器开发者工具 (F12)，查看 Console 标签页：

```javascript
// 如果看到这些错误，表示路由有问题
Error: 语言切换失败: [错误详情]

// 检查当前语言设置
console.log(router.locale); // 应该显示 'zh' 或 'en'
console.log(router.locales); // 应该显示 ['zh', 'en']
```

### 2. 手动测试语言切换
在浏览器地址栏直接访问：
- 中文版本: `http://localhost:3000`
- 英文版本: `http://localhost:3000/en`

### 3. 检查 Network 标签
在开发者工具的 Network 标签页中：
- 点击语言切换按钮
- 观察是否有新的页面请求
- 检查请求的 URL 是否正确

## ⚡ 进一步性能优化建议

### 1. 生产环境优化
```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

### 2. 图片压缩
推荐使用工具压缩图片：
- **在线工具**: TinyPNG, ImageOptim
- **本地工具**: `imagemin`, `squoosh-cli`

```bash
# 安装 imagemin（可选）
npm install -g imagemin-cli

# 压缩图片
imagemin public/icons/**/*.{jpg,png} --out-dir=public/icons/compressed/
```

### 3. 代码分割
Next.js 自动进行代码分割，但你可以进一步优化：

```javascript
// 动态导入大型组件
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>加载中...</p>,
})
```

### 4. CDN 优化
考虑使用 CDN 来加速图片和静态资源加载：
- Cloudflare
- AWS CloudFront
- Vercel（推荐用于 Next.js）

## 🔧 常见问题解决方案

### 问题 1: 语言切换按钮无响应
**解决方案:**
1. 检查浏览器控制台是否有 JavaScript 错误
2. 确认 `next.config.mjs` 中的 i18n 配置正确
3. 尝试硬刷新页面 (Ctrl+F5)

### 问题 2: 图片加载慢或失败
**解决方案:**
1. 检查图片路径是否正确
2. 确认图片文件存在于 `public/` 目录
3. 图片文件大小建议 < 100KB

### 问题 3: 页面加载慢
**解决方案:**
1. 检查网络连接
2. 使用生产模式构建
3. 启用 gzip 压缩

## 📊 性能监控

### 1. 使用 Lighthouse
在 Chrome 开发者工具中：
1. 打开 Lighthouse 标签页
2. 点击 "Generate report"
3. 查看 Performance 分数

### 2. 使用 Web Vitals
```javascript
// 在 _app.tsx 中添加性能监控
export function reportWebVitals(metric) {
  console.log(metric)
}
```

### 3. 监控工具推荐
- **开发阶段**: React DevTools Profiler
- **生产阶段**: Vercel Analytics, Google Analytics

## 🎯 优化检查清单

### 开发环境优化
- [ ] 启用热重载
- [ ] 使用 TypeScript 严格模式
- [ ] 配置 ESLint 和 Prettier

### 图片优化
- [ ] 使用 WebP 格式（如果支持）
- [ ] 设置适当的图片尺寸
- [ ] 添加 alt 属性（SEO）

### 代码优化
- [ ] 移除 console.log
- [ ] 使用 Production 构建
- [ ] 启用代码压缩

### 网络优化
- [ ] 启用 HTTP/2
- [ ] 配置缓存策略
- [ ] 使用 CDN

## 🚦 实时监控命令

```bash
# 监控构建大小
npx @next/bundle-analyzer

# 性能分析
npm run build && npm run start

# 内存使用监控
node --inspect server.js
```

## 📱 移动端优化

### 响应式设计检查
1. 使用浏览器的设备模拟器
2. 测试不同屏幕尺寸
3. 检查触摸友好性

### PWA 功能（可选）
```javascript
// next.config.mjs
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // 现有配置
})
```

## 🎉 部署优化

### Vercel 部署（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 其他平台
- **Netlify**: 支持 Next.js SSG
- **GitHub Pages**: 需要配置 `output: 'export'`
- **Docker**: 使用官方 Next.js Docker 镜像

---

记住：**性能优化是一个持续的过程**。定期监控和调整是关键！🚀 