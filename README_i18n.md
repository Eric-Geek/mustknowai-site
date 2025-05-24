# 中英文切换功能使用说明

## 🌍 功能概述

您的 MustKnowAI 网站现在支持完整的中英文切换功能！

## 🚀 如何使用

### 1. 访问不同语言版本

- **中文版本**: http://localhost:3000 或 http://localhost:3000/zh
- **英文版本**: http://localhost:3000/en

### 2. 语言切换

- 点击页面右上角的地球图标（🌐）
- 从下拉菜单中选择 "中文" 或 "English"
- 页面会自动切换到选择的语言，并保持当前页面路径

### 3. URL 结构

- 中文（默认）: `/` `/tools` `/blog`
- 英文: `/en` `/en/tools` `/en/blog`

## 📁 图标文件结构

请将您的图标文件放置在以下目录：

```
public/
├── icons/
│   ├── tools/           # 工具图标
│   │   ├── chatgpt-icon.png
│   │   ├── midjourney-icon.jpg
│   │   ├── github-copilot-icon.jpg
│   │   ├── notion-icon.jpg
│   │   ├── runway-icon.jpg
│   │   └── claude-icon.jpg
│   └── categories/      # 分类图标
│       ├── writing-icon.png
│       ├── image-icon.png
│       ├── video-icon.png
│       └── code-icon.png
```

## 🔧 技术实现

### Next.js i18n 配置

```javascript
// next.config.mjs
i18n: {
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localeDetection: true,
}
```

### 翻译文件

- `locales/zh/common.json` - 中文翻译
- `locales/en/common.json` - 英文翻译

### 自动语言检测

- 系统会根据用户浏览器设置自动选择语言
- 支持 SEO 优化的多语言 URL 结构
- 自动生成 `hreflang` 和 Open Graph 标签

## 📝 添加新翻译

要添加新的翻译内容：

1. 在 `locales/zh/common.json` 中添加中文键值对
2. 在 `locales/en/common.json` 中添加对应的英文翻译
3. 在组件中使用 `t.yourNewKey` 引用

例如：
```json
// locales/zh/common.json
{
  "newFeature": "新功能"
}

// locales/en/common.json  
{
  "newFeature": "New Feature"
}
```

## 🎯 SEO 优化

每个页面都包含完整的多语言 SEO 优化：

- 自动生成 `og:locale` 和 `og:locale:alternate` 标签
- 语言特定的 URL 结构
- 搜索引擎友好的多语言内容发现

## 🛠️ 开发提示

1. 所有用户可见的文本都应该通过翻译文件管理
2. 使用 `router.locale` 获取当前语言
3. 使用 `router.push(..., ..., { locale })` 进行语言特定的导航
4. 图片的 alt 属性也应该支持多语言

现在您可以享受完整的双语网站体验了！🎉 