#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 验证图标文件...\n');

// 定义期望的图标文件
const expectedIcons = {
  tools: [
    'chatgpt-icon.svg',
    'claude-icon.svg',
    'deepseek-icon.svg',
    'gemini-icon.svg',
    'github-copilot-icon.svg',
    'midjourney-icon.svg',
    'notion-icon.svg',
    'perplexity-icon.svg',
    'runway-icon.svg',
    'stable-diffusion-icon.svg'
  ],
  categories: [
    'writing-icon.svg',
    'image-icon.svg',
    'video-icon.svg',
    'code-icon.svg'
  ]
};

let allValid = true;

// 检查工具图标
console.log('🛠️  检查工具图标:');
const toolsDir = path.join(process.cwd(), 'public', 'icons', 'tools');
expectedIcons.tools.forEach(icon => {
  const iconPath = path.join(toolsDir, icon);
  if (fs.existsSync(iconPath)) {
    const stats = fs.statSync(iconPath);
    console.log(`✅ ${icon} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    console.log(`❌ ${icon} - 文件不存在`);
    allValid = false;
  }
});

console.log('\n📂 检查分类图标:');
const categoriesDir = path.join(process.cwd(), 'public', 'icons', 'categories');
expectedIcons.categories.forEach(icon => {
  const iconPath = path.join(categoriesDir, icon);
  if (fs.existsSync(iconPath)) {
    const stats = fs.statSync(iconPath);
    console.log(`✅ ${icon} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    console.log(`❌ ${icon} - 文件不存在`);
    allValid = false;
  }
});

// 检查是否有多余的文件
console.log('\n🔍 检查多余文件:');
const checkExtraFiles = (dir, expected, type) => {
  if (!fs.existsSync(dir)) {
    console.log(`❌ 目录不存在: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));
  const extraFiles = files.filter(f => !expected.includes(f));
  
  if (extraFiles.length > 0) {
    console.log(`⚠️  ${type} 目录中的多余文件:`);
    extraFiles.forEach(f => console.log(`   - ${f}`));
  } else {
    console.log(`✅ ${type} 目录中没有多余文件`);
  }
};

checkExtraFiles(toolsDir, expectedIcons.tools, '工具图标');
checkExtraFiles(categoriesDir, expectedIcons.categories, '分类图标');

console.log('\n📊 验证结果:');
if (allValid) {
  console.log('🎉 所有图标文件都存在且正确！');
  console.log('\n💡 如果网站上的图标仍然不正确，请尝试:');
  console.log('   1. 清理浏览器缓存 (Ctrl+Shift+R 或 Cmd+Shift+R)');
  console.log('   2. 运行 npm run clear-cache');
  console.log('   3. 重新构建项目 npm run build');
  console.log('   4. 访问 /debug-icons 页面进行调试');
} else {
  console.log('❌ 发现缺失的图标文件，请检查上述错误');
  process.exit(1);
} 