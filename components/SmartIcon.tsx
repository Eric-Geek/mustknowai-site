import React, { memo, useState, useMemo } from 'react';
import Image from 'next/image';
import { CategoryIconMap, CategoryType } from './icons/CategoryIcons';
import { ToolIconMap, ToolType } from './icons/ToolIcons';

interface SmartIconProps {
  name: string;
  type: 'category' | 'tool';
  fallbackSrc?: string;
  size?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}

export const SmartIcon = memo<SmartIconProps>(function SmartIcon({
  name,
  type,
  fallbackSrc,
  size = 64,
  className = "",
  priority = false,
  alt
}) {
  const [imageError, setImageError] = useState(false);
  const [customIconError, setCustomIconError] = useState(false);

  // 生成自定义图标路径
  const customIconPath = useMemo(() => {
    if (type === 'category') {
      // 对于分类图标，使用标准化的名称映射
      const categoryNameMap: Record<string, string> = {
        'writing': 'writing-icon.svg',
        'image': 'image-icon.svg', 
        'video': 'video-icon.svg',
        'code': 'code-icon.svg',
        'Writing': 'writing-icon.svg',
        'Image': 'image-icon.svg',
        'Video': 'video-icon.svg',
        'Code': 'code-icon.svg'
      };
      const iconFile = categoryNameMap[name] || `${name.toLowerCase()}-icon.svg`;
      return `/icons/categories/${iconFile}`;
    } else {
      // 对于工具图标，使用更智能的名称映射
      const toolNameMap: Record<string, string> = {
        'ChatGPT': 'chatgpt-icon.svg',
        'Claude AI': 'claude-icon.svg',
        'Claude': 'claude-icon.svg',
        'DeepSeek': 'deepseek-icon.svg',
        'Gemini': 'gemini-icon.svg',
        'GitHub Copilot': 'github-copilot-icon.svg',
        'Midjourney': 'midjourney-icon.svg',
        'Notion AI': 'notion-icon.svg',
        'Notion': 'notion-icon.svg',
        'Perplexity AI': 'perplexity-icon.svg',
        'Perplexity': 'perplexity-icon.svg',
        'RunwayML': 'runway-icon.svg',
        'Runway': 'runway-icon.svg',
        'Stable Diffusion': 'stable-diffusion-icon.svg'
      };
      
      const iconFile = toolNameMap[name] || `${name.toLowerCase().replace(/\s+/g, '-')}-icon.svg`;
      return `/icons/tools/${iconFile}`;
    }
  }, [name, type]);

  // 尝试从组件映射中获取图标（作为最后的回退）
  const IconComponent = useMemo(() => {
    if (type === 'category' && name in CategoryIconMap) {
      return CategoryIconMap[name as CategoryType];
    }
    if (type === 'tool' && name in ToolIconMap) {
      return ToolIconMap[name as ToolType];
    }
    return null;
  }, [name, type]);

  // 优先级：1. 用户上传的SVG -> 2. fallbackSrc -> 3. React组件 -> 4. 首字母
  
  // 1. 首先尝试用户上传的SVG图标
  if (!customIconError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={customIconPath}
          alt={alt || `${name} icon`}
          width={size}
          height={size}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          onError={() => {
            console.log(`Custom icon not found: ${customIconPath}, trying fallback...`);
            setCustomIconError(true);
          }}
          onLoad={() => {
            console.log(`Successfully loaded custom icon: ${customIconPath}`);
          }}
        />
      </div>
    );
  }

  // 2. 回退到提供的fallbackSrc
  if (fallbackSrc && !imageError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={fallbackSrc}
          alt={alt || `${name} icon`}
          width={size}
          height={size}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          onError={() => {
            console.log(`Fallback icon failed: ${fallbackSrc}, trying React component...`);
            setImageError(true);
          }}
        />
      </div>
    );
  }

  // 3. 回退到React组件
  if (IconComponent) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <IconComponent 
          size={size} 
          className="transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
    );
  }

  // 4. 最终回退：显示首字母
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="flex items-center justify-center text-white font-bold bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
});

export default SmartIcon; 