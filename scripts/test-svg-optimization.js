#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 SVG 优化验证脚本');
console.log('='.repeat(50));

// 检查 SVG 文件
function checkSVGFiles() {
  console.log('\n📁 检查 SVG 文件...');
  
  const categoriesPath = path.join(__dirname, '../public/icons/categories');
  const toolsPath = path.join(__dirname, '../public/icons/tools');
  
  const categoryFiles = fs.readdirSync(categoriesPath).filter(f => f.endsWith('.svg'));
  const toolFiles = fs.readdirSync(toolsPath).filter(f => f.endsWith('.svg'));
  
  console.log(`✅ 分类图标: ${categoryFiles.length} 个`);
  categoryFiles.forEach(file => console.log(`   - ${file}`));
  
  console.log(`✅ 工具图标: ${toolFiles.length} 个`);
  toolFiles.forEach(file => console.log(`   - ${file}`));
  
  return { categoryFiles, toolFiles };
}

// 检查组件文件
function checkComponentFiles() {
  console.log('\n🧩 检查组件文件...');
  
  const componentsToCheck = [
    'components/icons/CategoryIcons.tsx',
    'components/icons/ToolIcons.tsx',
    'components/SmartIcon.tsx',
    'components/SVGPreloader.tsx',
    'components/PerformanceMonitor.tsx',
    'lib/svgUtils.ts'
  ];
  
  componentsToCheck.forEach(component => {
    const filePath = path.join(__dirname, '..', component);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${component}`);
    } else {
      console.log(`❌ ${component} - 文件不存在`);
    }
  });
}

// 检查配置文件
function checkConfigFiles() {
  console.log('\n⚙️  检查配置文件...');
  
  const nextConfigPath = path.join(__dirname, '../next.config.mjs');
  if (fs.existsSync(nextConfigPath)) {
    const content = fs.readFileSync(nextConfigPath, 'utf8');
    
    if (content.includes('@svgr/webpack')) {
      console.log('✅ SVGR webpack 配置已添加');
    } else {
      console.log('❌ SVGR webpack 配置缺失');
    }
    
    if (content.includes('dangerouslyAllowSVG')) {
      console.log('✅ SVG 图片优化配置已启用');
    } else {
      console.log('❌ SVG 图片优化配置缺失');
    }
  }
}

// 检查代码中的图标引用
function checkIconReferences() {
  console.log('\n🔗 检查图标引用...');
  
  const filesToCheck = [
    'pages/index.tsx',
    'pages/tools/index.tsx',
    'components/ToolCard.tsx'
  ];
  
  filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 检查是否还有 .png 或 .jpg 引用
      const pngMatches = content.match(/\.png/g);
      const jpgMatches = content.match(/\.jpg/g);
      
      if (pngMatches || jpgMatches) {
        console.log(`⚠️  ${file} 仍包含光栅图片引用:`);
        if (pngMatches) console.log(`   - PNG 引用: ${pngMatches.length} 个`);
        if (jpgMatches) console.log(`   - JPG 引用: ${jpgMatches.length} 个`);
      } else {
        console.log(`✅ ${file} - 已完全迁移到 SVG`);
      }
      
      // 检查是否使用了 SmartIcon
      if (content.includes('SmartIcon')) {
        console.log(`✅ ${file} - 使用了 SmartIcon 组件`);
      }
    }
  });
}

// 性能建议
function performanceRecommendations() {
  console.log('\n🚀 性能优化建议:');
  console.log('1. 确保在生产环境中启用 SVG 压缩');
  console.log('2. 考虑为常用图标创建 SVG 雪碧图');
  console.log('3. 监控 Core Web Vitals 指标');
  console.log('4. 定期清理未使用的图标文件');
  console.log('5. 考虑使用 CDN 加速图标加载');
}

// 运行所有检查
function runAllChecks() {
  try {
    checkSVGFiles();
    checkComponentFiles();
    checkConfigFiles();
    checkIconReferences();
    performanceRecommendations();
    
    console.log('\n🎉 SVG 优化验证完成!');
    console.log('如果看到任何 ❌ 标记，请检查相应的文件或配置。');
    
  } catch (error) {
    console.error('❌ 验证过程中出现错误:', error.message);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runAllChecks();
}

module.exports = {
  checkSVGFiles,
  checkComponentFiles,
  checkConfigFiles,
  checkIconReferences,
  runAllChecks
}; 