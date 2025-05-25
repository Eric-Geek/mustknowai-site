import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  iconLoadTime: number;
  totalIcons: number;
  failedIcons: number;
  cacheHitRate: number;
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  enableLogging?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsUpdate,
  enableLogging = false
}) => {
  const metricsRef = useRef<PerformanceMetrics>({
    iconLoadTime: 0,
    totalIcons: 0,
    failedIcons: 0,
    cacheHitRate: 0,
  });

  useEffect(() => {
    let observer: PerformanceObserver | null = null;

    if ('PerformanceObserver' in window) {
      observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
                 entries.forEach((entry) => {
           // 监控图片/SVG 加载性能
           if (entry.entryType === 'resource' && 
               (entry.name.includes('.svg') || entry.name.includes('icon'))) {
             
             const resourceEntry = entry as PerformanceResourceTiming;
             const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
             metricsRef.current.iconLoadTime += loadTime;
             metricsRef.current.totalIcons += 1;

             if (enableLogging) {
               console.log(`SVG loaded: ${entry.name} in ${loadTime.toFixed(2)}ms`);
             }
           }
         });

        // 更新指标
        if (onMetricsUpdate) {
          onMetricsUpdate({ ...metricsRef.current });
        }
      });

      try {
        observer.observe({ entryTypes: ['resource', 'navigation'] });
      } catch (error) {
        console.warn('Performance monitoring not supported:', error);
      }
    }

    // 监控图片加载错误
    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      if (target.src.includes('.svg') || target.alt.includes('icon')) {
        metricsRef.current.failedIcons += 1;
        
        if (enableLogging) {
          console.warn(`Failed to load icon: ${target.src}`);
        }
      }
    };

    // 添加全局错误监听
    document.addEventListener('error', handleImageError, true);

    // 定期报告性能指标
    const reportInterval = setInterval(() => {
      if (onMetricsUpdate && metricsRef.current.totalIcons > 0) {
        const avgLoadTime = metricsRef.current.iconLoadTime / metricsRef.current.totalIcons;
        const successRate = (metricsRef.current.totalIcons - metricsRef.current.failedIcons) / metricsRef.current.totalIcons;
        
        if (enableLogging) {
          console.log('Icon Performance Metrics:', {
            averageLoadTime: `${avgLoadTime.toFixed(2)}ms`,
            totalIcons: metricsRef.current.totalIcons,
            failedIcons: metricsRef.current.failedIcons,
            successRate: `${(successRate * 100).toFixed(1)}%`
          });
        }

        onMetricsUpdate({
          ...metricsRef.current,
          iconLoadTime: avgLoadTime,
          cacheHitRate: successRate
        });
      }
    }, 5000); // 每5秒报告一次

    return () => {
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener('error', handleImageError, true);
      clearInterval(reportInterval);
    };
  }, [onMetricsUpdate, enableLogging]);

  // 监控 Core Web Vitals
  useEffect(() => {
    if ('web-vitals' in window || typeof window !== 'undefined') {
      // 监控 LCP (Largest Contentful Paint)
      const observeLCP = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            if (enableLogging) {
              console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
            }
          });

          try {
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (error) {
            // LCP 不支持时忽略
          }
        }
      };

      // 监控 CLS (Cumulative Layout Shift)
      const observeCLS = () => {
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });

            if (enableLogging && clsValue > 0) {
              console.log(`CLS: ${clsValue.toFixed(4)}`);
            }
          });

          try {
            observer.observe({ entryTypes: ['layout-shift'] });
          } catch (error) {
            // CLS 不支持时忽略
          }
        }
      };

      observeLCP();
      observeCLS();
    }
  }, [enableLogging]);

  return null; // 这个组件不渲染任何内容
};

export default PerformanceMonitor; 