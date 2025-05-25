#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 清理 Next.js 缓存...');

// 清理 .next 目录
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('✅ 已清理 .next 目录');
} else {
  console.log('ℹ️  .next 目录不存在');
}

// 清理 node_modules/.cache
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('✅ 已清理 node_modules/.cache 目录');
} else {
  console.log('ℹ️  node_modules/.cache 目录不存在');
}

console.log('🎉 缓存清理完成！');
console.log('💡 建议执行以下命令：');
console.log('   1. npm run build');
console.log('   2. npm run start');
console.log('   或者 npm run dev (开发模式)'); 