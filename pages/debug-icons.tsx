import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function DebugIcons() {
  const toolIcons = [
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
  ];

  const categoryIcons = [
    'writing-icon.svg',
    'image-icon.svg',
    'video-icon.svg',
    'code-icon.svg'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Head>
        <title>图标调试页面</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 图标调试页面</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 工具图标</h2>
          <div className="grid grid-cols-5 gap-6">
            {toolIcons.map((icon) => (
              <div key={icon} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="mb-3">
                  <Image
                    src={`/icons/tools/${icon}`}
                    alt={icon}
                    width={64}
                    height={64}
                    className="mx-auto"
                    onError={(e) => {
                      console.error(`Failed to load: /icons/tools/${icon}`);
                      e.currentTarget.style.border = '2px solid red';
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded: /icons/tools/${icon}`);
                    }}
                  />
                </div>
                <p className="text-sm font-medium">{icon}</p>
                <p className="text-xs text-gray-500">/icons/tools/{icon}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">📂 分类图标</h2>
          <div className="grid grid-cols-4 gap-6">
            {categoryIcons.map((icon) => (
              <div key={icon} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="mb-3">
                  <Image
                    src={`/icons/categories/${icon}`}
                    alt={icon}
                    width={64}
                    height={64}
                    className="mx-auto"
                    onError={(e) => {
                      console.error(`Failed to load: /icons/categories/${icon}`);
                      e.currentTarget.style.border = '2px solid red';
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded: /icons/categories/${icon}`);
                    }}
                  />
                </div>
                <p className="text-sm font-medium">{icon}</p>
                <p className="text-xs text-gray-500">/icons/categories/{icon}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">📋 调试信息</h3>
          <ul className="text-sm space-y-2">
            <li>• 打开浏览器开发者工具查看控制台日志</li>
            <li>• 红色边框表示图标加载失败</li>
            <li>• 检查网络面板查看 404 错误</li>
            <li>• 确保文件路径和文件名完全匹配</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 