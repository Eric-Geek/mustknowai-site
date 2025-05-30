import { useEffect, useCallback } from 'react';
import { preloadImages } from '@/utils/imageOptimization';

// requestIdleCallback polyfill
const requestIdleCallbackPolyfill = (
  callback: () => void, 
  options?: { timeout?: number }
): number => {
  if (typeof window !== 'undefined' && window.requestIdleCallback) {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    return window.setTimeout(callback, options?.timeout || 1);
  }
};

interface UsePreloaderOptions {
  preloadImages?: string[];
  preloadComponents?: (() => Promise<any>)[];
  timeout?: number;
}

export const usePreloader = (options: UsePreloaderOptions = {}) => {
  const { 
    preloadImages: imagesToPreload = [], 
    preloadComponents = [],
    timeout = 2000 
  } = options;

  const preloadComponentsAsync = useCallback(async () => {
    if (preloadComponents.length === 0) return;

    preloadComponents.forEach(load => {
      requestIdleCallbackPolyfill(() => {
        load().catch(error => {
          console.warn('Failed to preload component:', error);
        });
      }, { timeout });
    });
  }, [preloadComponents, timeout]);

  const preloadImagesAsync = useCallback(async () => {
    if (imagesToPreload.length === 0) return;

    try {
      await preloadImages(imagesToPreload);
    } catch (error) {
      console.warn('Failed to preload some images:', error);
    }
  }, [imagesToPreload]);

  useEffect(() => {
    // 预加载组件
    preloadComponentsAsync();
    
    // 预加载图片
    preloadImagesAsync();
  }, [preloadComponentsAsync, preloadImagesAsync]);

  return {
    preloadComponents: preloadComponentsAsync,
    preloadImages: preloadImagesAsync
  };
}; 