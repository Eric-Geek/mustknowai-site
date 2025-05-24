#!/bin/bash

echo "🚀 测试博客修复和语言切换功能..."
echo ""

# 检查服务器状态
echo "1️⃣ 检查开发服务器..."
if curl -s -f http://localhost:3000 > /dev/null; then
    echo "✅ 开发服务器运行正常"
else
    echo "❌ 开发服务器未运行，请先执行: pnpm dev"
    exit 1
fi

echo ""
echo "2️⃣ 测试页面响应..."

# 测试主页
if curl -s -f http://localhost:3000 > /dev/null; then
    echo "✅ 主页 (中文): http://localhost:3000"
else
    echo "❌ 主页响应异常"
fi

# 测试博客页面  
if curl -s -f http://localhost:3000/blog > /dev/null; then
    echo "✅ 博客页面: http://localhost:3000/blog"
else
    echo "❌ 博客页面响应异常"
fi

# 测试英文版
if curl -s -f http://localhost:3000/en > /dev/null; then
    echo "✅ 英文版: http://localhost:3000/en"
else
    echo "❌ 英文版响应异常"
fi

# 测试工具页面
if curl -s -f http://localhost:3000/tools > /dev/null; then
    echo "✅ 工具页面: http://localhost:3000/tools"
else
    echo "❌ 工具页面响应异常"
fi

echo ""
echo "3️⃣ 手动测试建议:"
echo "🌐 语言切换: 点击右上角地球图标，选择中文/English"
echo "🔍 博客搜索: 在博客页面搜索 'ChatGPT' 或 'AI'"
echo "📱 移动端: 使用浏览器开发者工具测试移动端视图"

echo ""
echo "🎉 测试完成! 如有问题请查看:"
echo "   - BLOG_FIXES_SUMMARY.md (修复总结)"
echo "   - PERFORMANCE_DEBUG.md (调试指南)" 