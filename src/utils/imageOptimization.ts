import React from 'react';

// 图片优化相关工具函数

// 检查WebP支持
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// 获取优化后的图片URL
export const getOptimizedImageUrl = (imagePath: string, fallbackPath?: string): string => {
  // 如果是外部链接，直接返回
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // 检查是否支持WebP
  if (!supportsWebP() && imagePath.endsWith('.webp')) {
    // 不支持WebP时的fallback策略
    const fallback = fallbackPath || imagePath.replace('.webp', '.jpg');
    return fallback;
  }
  
  return imagePath;
};

// 预加载图片
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// 批量预加载图片
export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(url => preloadImage(url)));
    console.log('All images preloaded successfully');
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// 图片懒加载Hook
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder || '');
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  
  React.useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };
    
    img.src = getOptimizedImageUrl(src);
  }, [src]);
  
  return { imageSrc, isLoading, hasError };
};

// 生成响应式图片srcSet
export const generateSrcSet = (basePath: string, sizes: number[] = [400, 800, 1200]): string => {
  const extension = basePath.split('.').pop();
  const pathWithoutExtension = basePath.replace(`.${extension}`, '');
  
  return sizes
    .map(size => `${pathWithoutExtension}_${size}w.${extension} ${size}w`)
    .join(', ');
};

// 默认fallback图片
export const DEFAULT_FALLBACK_IMAGE = '/images/placeholder.svg';

// 工具图片映射
export const TOOL_IMAGE_MAPPING = {
  chatgpt: '/images/tools/chatgpt.webp',
  'hugging-face': '/images/tools/huggingface.webp',
  'google-colab': '/images/tools/colab.webp',
  'canva-ai': '/images/tools/canva.webp',
  aiva: '/images/tools/aiva.webp',
  'amper-music': '/images/tools/amper.webp',
  soundraw: '/images/tools/soundraw.webp',
  elevenlabs: '/images/tools/elevenlabs.webp',
  'murf-ai': '/images/tools/murf.webp',
  'resemble-ai': '/images/tools/resemble.webp',
} as const; 