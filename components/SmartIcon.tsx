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

  // 尝试从组件映射中获取图标
  const IconComponent = useMemo(() => {
    if (type === 'category' && name in CategoryIconMap) {
      return CategoryIconMap[name as CategoryType];
    }
    if (type === 'tool' && name in ToolIconMap) {
      return ToolIconMap[name as ToolType];
    }
    return null;
  }, [name, type]);

  // 如果有对应的 React 组件，优先使用
  if (IconComponent && !imageError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <IconComponent 
          size={size} 
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    );
  }

  // 回退到图片
  if (fallbackSrc) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {!imageError ? (
          <Image
            src={fallbackSrc}
            alt={alt || `${name} icon`}
            width={size}
            height={size}
            className="object-contain transition-transform duration-300 group-hover:scale-110"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            onError={() => setImageError(true)}
          />
        ) : (
          // 最终回退：显示首字母
          <div 
            className="flex items-center justify-center text-white font-bold bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl transition-transform duration-300 group-hover:scale-110"
            style={{ width: size, height: size, fontSize: size * 0.4 }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    );
  }

  // 如果没有任何图标源，显示首字母回退
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className="flex items-center justify-center text-white font-bold bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
});

export default SmartIcon; 