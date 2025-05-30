import React, { useState, useCallback } from 'react';
import { getOptimizedImageUrl, DEFAULT_FALLBACK_IMAGE } from '@/utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  fallbackSrc,
  loading = 'lazy',
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(getOptimizedImageUrl(src));
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    
    // 尝试fallback图片
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(false);
      setIsLoading(true);
    } else if (imageSrc !== DEFAULT_FALLBACK_IMAGE) {
      setImageSrc(DEFAULT_FALLBACK_IMAGE);
      setHasError(false);
      setIsLoading(true);
    }
    
    onError?.();
  }, [fallbackSrc, imageSrc, onError]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 占位符/骨架屏 */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          {placeholder ? (
            <img 
              src={placeholder} 
              alt={alt}
              className="opacity-50"
              aria-hidden="true"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded" />
          )}
        </div>
      )}
      
      {/* 实际图片 */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${hasError ? 'opacity-50' : ''}
        `}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
      
      {/* 错误状态指示器 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-80">
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="w-8 h-8 mx-auto mb-2 opacity-50">
              📷
            </div>
            <span>图片加载失败</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 