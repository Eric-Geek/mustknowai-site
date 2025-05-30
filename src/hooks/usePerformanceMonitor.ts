import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export const usePerformanceMonitor = (pageName: string) => {
  const recordMetrics = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // 使用Performance API记录指标
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`[Performance] ${pageName} - ${entry.name}:`, entry);
          
          // 发送到分析服务（如果需要）
          // analyticsService.track('performance', {
          //   page: pageName,
          //   metric: entry.name,
          //   value: entry.value || entry.duration,
          //   timestamp: Date.now()
          // });
        }
      });

      // 观察各种性能指标
      try {
        observer.observe({ entryTypes: ['measure', 'navigation', 'paint', 'layout-shift'] });
      } catch (e) {
        console.warn('Performance Observer not fully supported:', e);
      }

      return () => observer.disconnect();
    }
  }, [pageName]);

  const measureUserInteraction = useCallback((actionName: string, startTime?: number) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const endTime = performance.now();
      const duration = startTime ? endTime - startTime : 0;
      
      performance.mark(`${actionName}-end`);
      if (startTime) {
        performance.mark(`${actionName}-start`, { startTime });
        performance.measure(actionName, `${actionName}-start`, `${actionName}-end`);
      }

      console.log(`[Interaction] ${pageName} - ${actionName}:`, duration);
    }
  }, [pageName]);

  const getPageLoadMetrics = useCallback((): Partial<PerformanceMetrics> => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return {};
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const metrics: Partial<PerformanceMetrics> = {};

    if (navigation) {
      metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
    }

    paint.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        metrics.firstContentfulPaint = entry.startTime;
      }
    });

    return metrics;
  }, []);

  useEffect(() => {
    const cleanup = recordMetrics();
    
    // 页面加载完成后记录指标
    const handleLoad = () => {
      setTimeout(() => {
        const metrics = getPageLoadMetrics();
        console.log(`[Page Load] ${pageName} metrics:`, metrics);
      }, 0);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      cleanup?.();
      window.removeEventListener('load', handleLoad);
    };
  }, [recordMetrics, getPageLoadMetrics, pageName]);

  return {
    measureUserInteraction,
    getPageLoadMetrics
  };
}; 