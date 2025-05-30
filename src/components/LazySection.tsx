import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

// 骨架屏组件
export const SectionSkeleton: React.FC<{ height?: string; className?: string }> = ({ 
  height = 'h-64', 
  className = '' 
}) => (
  <div className={`${height} animate-pulse ${className}`}>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-full" />
  </div>
);

// 延迟加载包装组件
const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback, 
  threshold = 0.1,
  rootMargin = '50px',
  className = ''
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
    rootMargin
  });

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <Suspense fallback={fallback || <SectionSkeleton />}>
          {children}
        </Suspense>
      ) : (
        fallback || <SectionSkeleton />
      )}
    </div>
  );
};

export default LazySection; 