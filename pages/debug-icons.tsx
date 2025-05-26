import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import SmartIcon from '@/components/SmartIcon';

export default function DebugIcons() {
  const toolIcons = [
    { name: 'ChatGPT', file: 'chatgpt-icon.svg' },
    { name: 'Claude AI', file: 'claude-icon.svg' },
    { name: 'DeepSeek', file: 'deepseek-icon.svg' },
    { name: 'Gemini', file: 'gemini-icon.svg' },
    { name: 'GitHub Copilot', file: 'github-copilot-icon.svg' },
    { name: 'Midjourney', file: 'midjourney-icon.svg' },
    { name: 'Notion AI', file: 'notion-icon.svg' },
    { name: 'Perplexity AI', file: 'perplexity-icon.svg' },
    { name: 'RunwayML', file: 'runway-icon.svg' },
    { name: 'Stable Diffusion', file: 'stable-diffusion-icon.svg' }
  ];

  const categoryIcons = [
    { name: 'Writing', file: 'writing-icon.svg' },
    { name: 'Image', file: 'image-icon.svg' },
    { name: 'Video', file: 'video-icon.svg' },
    { name: 'Code', file: 'code-icon.svg' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Head>
        <title>图标调试页面 - 优先使用自定义图标</title>
      </Head>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 图标调试页面</h1>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-bold mb-4">📋 图标优先级说明</h3>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li><strong>第一优先级</strong>：您上传的自定义 SVG 图标 (/icons/tools/ 和 /icons/categories/)</li>
            <li><strong>第二优先级</strong>：fallbackSrc 指定的图标</li>
            <li><strong>第三优先级</strong>：React 组件图标</li>
            <li><strong>最后回退</strong>：首字母显示</li>
          </ol>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🛠️ 工具图标 - SmartIcon 测试</h2>
          <div className="grid grid-cols-5 gap-6">
            {toolIcons.map((icon) => (
              <div key={icon.name} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="mb-3">
                  <SmartIcon
                    name={icon.name}
                    type="tool"
                    size={64}
                    className="mx-auto"
                    alt={icon.name}
                  />
                </div>
                <p className="text-sm font-medium">{icon.name}</p>
                <p className="text-xs text-gray-500">SmartIcon</p>
                <p className="text-xs text-blue-600">{icon.file}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📂 分类图标 - SmartIcon 测试</h2>
          <div className="grid grid-cols-4 gap-6">
            {categoryIcons.map((icon) => (
              <div key={icon.name} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="mb-3">
                  <SmartIcon
                    name={icon.name}
                    type="category"
                    size={64}
                    className="mx-auto"
                    alt={icon.name}
                  />
                </div>
                <p className="text-sm font-medium">{icon.name}</p>
                <p className="text-xs text-gray-500">SmartIcon</p>
                <p className="text-xs text-blue-600">{icon.file}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🔄 回退机制测试</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="mb-3">
                <SmartIcon
                  name="不存在的工具"
                  type="tool"
                  size={64}
                  className="mx-auto"
                />
              </div>
              <p className="text-sm font-medium">不存在的工具</p>
              <p className="text-xs text-gray-500">应显示首字母 "不"</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="mb-3">
                <SmartIcon
                  name="测试工具"
                  type="tool"
                  fallbackSrc="/placeholder.svg"
                  size={64}
                  className="mx-auto"
                />
              </div>
              <p className="text-sm font-medium">测试工具</p>
              <p className="text-xs text-gray-500">使用 fallbackSrc</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="mb-3">
                <SmartIcon
                  name="ChatGPT"
                  type="tool"
                  fallbackSrc="/placeholder.svg"
                  size={64}
                  className="mx-auto"
                />
              </div>
              <p className="text-sm font-medium">ChatGPT</p>
              <p className="text-xs text-gray-500">应优先使用自定义图标</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📏 尺寸测试</h2>
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
              {[24, 32, 48, 64, 96, 128].map((size) => (
                <div key={size} className="flex flex-col items-center">
                  <SmartIcon
                    name="ChatGPT"
                    type="tool"
                    size={size}
                    className="mb-2"
                  />
                  <span className="text-sm text-gray-600">{size}px</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🔍 直接图片加载测试</h2>
          <div className="grid grid-cols-5 gap-6">
            {toolIcons.map((icon) => (
              <div key={icon.file} className="bg-white p-4 rounded-lg shadow text-center">
                <div className="mb-3">
                  <Image
                    src={`/icons/tools/${icon.file}`}
                    alt={icon.name}
                    width={64}
                    height={64}
                    className="mx-auto"
                    onError={(e) => {
                      console.error(`Failed to load: /icons/tools/${icon.file}`);
                      e.currentTarget.style.border = '2px solid red';
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded: /icons/tools/${icon.file}`);
                    }}
                  />
                </div>
                <p className="text-sm font-medium">{icon.name}</p>
                <p className="text-xs text-gray-500">直接加载</p>
                <p className="text-xs text-blue-600">{icon.file}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">✅ 验证清单</h3>
          <ul className="text-sm space-y-2">
            <li>• 打开浏览器开发者工具查看控制台日志</li>
            <li>• 红色边框表示图标加载失败</li>
            <li>• SmartIcon 应该优先显示您上传的自定义图标</li>
            <li>• 检查控制台中的加载成功/失败消息</li>
            <li>• 确保所有自定义图标都能正确显示</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 