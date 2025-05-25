import React from 'react';
import Head from 'next/head';
import { 
  ChatGPTIcon, 
  MidjourneyIcon, 
  GitHubCopilotIcon, 
  ClaudeIcon, 
  NotionIcon, 
  RunwayIcon, 
  PerplexityIcon,
  CursorIcon,
  StableDiffusionIcon,
  GeminiIcon,
  DeepSeekIcon
} from '@/components/icons/ToolIcons';
import { 
  WritingIcon, 
  ImageIcon, 
  VideoIcon, 
  CodeIcon 
} from '@/components/icons/CategoryIcons';
import SmartIcon from '@/components/SmartIcon';

export default function TestIcons() {
  const toolIcons = [
    { name: 'ChatGPT', component: ChatGPTIcon },
    { name: 'Midjourney', component: MidjourneyIcon },
    { name: 'GitHub Copilot', component: GitHubCopilotIcon },
    { name: 'Claude AI', component: ClaudeIcon },
    { name: 'Notion AI', component: NotionIcon },
    { name: 'RunwayML', component: RunwayIcon },
    { name: 'Perplexity AI', component: PerplexityIcon },
    { name: 'Cursor', component: CursorIcon },
    { name: 'Stable Diffusion', component: StableDiffusionIcon },
    { name: 'Gemini', component: GeminiIcon },
    { name: 'DeepSeek', component: DeepSeekIcon },
  ];

  const categoryIcons = [
    { name: 'Writing', component: WritingIcon },
    { name: 'Image', component: ImageIcon },
    { name: 'Video', component: VideoIcon },
    { name: 'Code', component: CodeIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 p-8">
      <Head>
        <title>图标测试页面 - SVG 图标展示</title>
        <meta name="description" content="测试所有上传的 SVG 图标" />
      </Head>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          🎨 SVG 图标测试页面
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-xl text-slate-600 dark:text-slate-300">
            展示所有上传的 SVG 图标，验证它们的显示效果
          </p>
        </div>

        {/* 工具图标部分 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            🛠️ 工具图标 (React 组件)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {toolIcons.map(({ name, component: IconComponent }) => (
              <div key={name} className="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="mb-4 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <IconComponent size={64} className="transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="text-sm font-semibold text-center text-slate-700 dark:text-slate-300">
                  {name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* 分类图标部分 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            📂 分类图标 (React 组件)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categoryIcons.map(({ name, component: IconComponent }) => (
              <div key={name} className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <IconComponent size={80} className="transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="text-lg font-semibold text-center text-slate-700 dark:text-slate-300">
                  {name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* SmartIcon 测试部分 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            🧠 SmartIcon 组件测试
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {toolIcons.slice(0, 8).map(({ name }) => (
              <div key={name} className="flex flex-col items-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <div className="mb-4">
                  <SmartIcon
                    name={name}
                    type="tool"
                    fallbackSrc={`/icons/tools/${name.toLowerCase().replace(/\s+/g, '-')}-icon.svg`}
                    size={56}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-medium text-center text-slate-700 dark:text-slate-300">
                  {name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">
                  SmartIcon
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 不同尺寸测试 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            📏 尺寸测试
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-center space-x-8 flex-wrap gap-4">
              {[24, 32, 48, 64, 96, 128].map((size) => (
                <div key={size} className="flex flex-col items-center">
                  <ChatGPTIcon size={size} className="mb-2" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{size}px</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 性能信息 */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              ✨ SVG 优化特性
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <strong>🚀 高性能</strong><br />
                React 组件化，无网络请求
              </div>
              <div>
                <strong>🎨 可定制</strong><br />
                支持 CSS 变量和主题切换
              </div>
              <div>
                <strong>📱 响应式</strong><br />
                在任何分辨率下都清晰
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 