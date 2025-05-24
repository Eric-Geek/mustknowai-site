#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(level, message) {
  const prefix = {
    success: `${colors.green}✅`,
    error: `${colors.red}❌`,
    warning: `${colors.yellow}⚠️`,
    info: `${colors.blue}ℹ️`
  }[level] || '•';
  
  console.log(`${prefix} ${message}${colors.reset}`);
}

// 检查服务器是否运行
function checkServer(port = 3000) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// 检查文件是否存在
function checkFile(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// 检查目录中的文件
function checkFiles(dir, extensions = []) {
  if (!fs.existsSync(dir)) return [];
  
  const files = fs.readdirSync(dir);
  return files.filter(file => {
    if (extensions.length === 0) return true;
    return extensions.some(ext => file.endsWith(ext));
  });
}

async function main() {
  console.log(`${colors.blue}🔍 检查网站状态...${colors.reset}\n`);

  // 1. 检查开发服务器
  log('info', '检查开发服务器...');
  const serverRunning = await checkServer(3000);
  
  if (serverRunning) {
    log('success', '开发服务器正在运行 (http://localhost:3000)');
  } else {
    log('error', '开发服务器未运行，请执行: pnpm dev');
    return;
  }

  // 2. 检查重要配置文件
  log('info', '检查配置文件...');
  const configFiles = [
    'next.config.mjs',
    'package.json',
    'tsconfig.json',
    'tailwind.config.js'
  ];

  configFiles.forEach(file => {
    if (checkFile(file)) {
      log('success', `配置文件存在: ${file}`);
    } else {
      log('error', `配置文件缺失: ${file}`);
    }
  });

  // 3. 检查翻译文件
  log('info', '检查翻译文件...');
  const localeFiles = [
    'locales/zh/common.json',
    'locales/en/common.json'
  ];

  localeFiles.forEach(file => {
    if (checkFile(file)) {
      log('success', `翻译文件存在: ${file}`);
    } else {
      log('error', `翻译文件缺失: ${file}`);
    }
  });

  // 4. 检查图标文件
  log('info', '检查图标文件...');
  
  const toolIcons = checkFiles('public/icons/tools', ['.png', '.jpg', '.jpeg']);
  const categoryIcons = checkFiles('public/icons/categories', ['.png', '.jpg', '.jpeg']);
  
  if (toolIcons.length > 0) {
    log('success', `工具图标: ${toolIcons.length} 个文件`);
    toolIcons.slice(0, 3).forEach(icon => {
      log('info', `  └─ ${icon}`);
    });
    if (toolIcons.length > 3) {
      log('info', `  └─ ... 还有 ${toolIcons.length - 3} 个文件`);
    }
  } else {
    log('warning', '没有找到工具图标');
  }

  if (categoryIcons.length > 0) {
    log('success', `分类图标: ${categoryIcons.length} 个文件`);
  } else {
    log('warning', '没有找到分类图标');
  }

  // 5. 检查关键组件
  log('info', '检查关键组件...');
  const components = [
    'components/LanguageSwitcher.tsx',
    'components/ToolCard.tsx',
    'components/ui/button.tsx',
    'components/ui/card.tsx'
  ];

  components.forEach(component => {
    if (checkFile(component)) {
      log('success', `组件存在: ${path.basename(component)}`);
    } else {
      log('error', `组件缺失: ${component}`);
    }
  });

  // 6. 检查页面
  log('info', '检查页面文件...');
  const pages = [
    'pages/index.tsx',
    'pages/tools/index.tsx',
    'pages/blog/index.tsx',
    'pages/_app.tsx'
  ];

  pages.forEach(page => {
    if (checkFile(page)) {
      log('success', `页面存在: ${path.basename(page)}`);
    } else {
      log('error', `页面缺失: ${page}`);
    }
  });

  // 7. 性能建议
  console.log(`\n${colors.blue}💡 性能优化建议:${colors.reset}`);
  log('info', '1. 使用 Lighthouse 检查页面性能分数');
  log('info', '2. 检查图片大小是否超过 100KB');
  log('info', '3. 在生产环境中启用压缩');
  log('info', '4. 考虑使用 CDN 加速图片加载');

  // 8. 测试链接
  console.log(`\n${colors.blue}🔗 测试链接:${colors.reset}`);
  log('info', '中文版本: http://localhost:3000');
  log('info', '英文版本: http://localhost:3000/en');
  log('info', '工具页面: http://localhost:3000/tools');
  log('info', '博客页面: http://localhost:3000/blog');

  console.log(`\n${colors.green}🎉 检查完成！${colors.reset}`);
  console.log(`${colors.yellow}如果发现问题，请查看 PERFORMANCE_DEBUG.md 获取解决方案。${colors.reset}`);
}

// 运行检查
main().catch(console.error); 