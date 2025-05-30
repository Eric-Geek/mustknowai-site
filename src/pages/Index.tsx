import React, { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import { toolsData } from '@/data/tools';
import { useInView } from 'react-intersection-observer';

// 懒加载组件
const JustLaunched = lazy(() => import('@/components/JustLaunched'));
const BannerAd = lazy(() => import('@/components/BannerAd'));
const RecommendTools = lazy(() => import('@/components/RecommendTools'));
const HotTools = lazy(() => import('@/components/HotTools'));
const RecommendSection = lazy(() => import('@/components/RecommendSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

// requestIdleCallback polyfill
const requestIdleCallbackPolyfill = (callback: () => void, options?: { timeout?: number }) => {
  if (typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    return setTimeout(callback, options?.timeout || 1);
  }
};

// 骨架屏组件
const SectionSkeleton = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} animate-pulse`}>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-full" />
  </div>
);

// 延迟加载包装组件
const LazySection = ({ 
  children, 
  fallback, 
  threshold = 0.1 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode; 
  threshold?: number;
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true
  });

  return (
    <div ref={ref}>
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

const Index = () => {
  // 预加载关键资源
  useEffect(() => {
    // 预加载下一个可能访问的页面
    const preloadComponents = async () => {
      const components = [
        () => import('@/components/JustLaunched'),
        () => import('@/components/RecommendTools'),
      ];
      
      components.forEach(load => {
        requestIdleCallbackPolyfill(() => load(), { timeout: 2000 });
      });
    };
    
    preloadComponents();
  }, []);

  return (
    <ErrorBoundary>
      <Helmet>
        <title>MustKnowAI - Discover AI Tools to Make AI Work for You</title>
        <meta name="description" content="Explore thousands of AI tools across categories including ChatGPT alternatives, music generation, voice synthesis, and more." />
        <meta property="og:title" content="MustKnowAI - AI Tools Directory" />
        <meta property="og:description" content="Discover the best AI tools for your needs" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mustknowai.com" />
        <meta property="og:image" content="https://mustknowai.com/og-image.jpg" />
        <link rel="canonical" href="https://mustknowai.com" />
        
        {/* 预连接到外部资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://analytics.google.com" />
        
        {/* 结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MustKnowAI",
            "url": "https://mustknowai.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mustknowai.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* 关键内容立即加载 */}
        <Header />
        <main>
          <HeroSection />
          
          {/* 非关键内容延迟加载 */}
          <LazySection>
            <JustLaunched />
          </LazySection>
          
          <LazySection>
            <BannerAd />
          </LazySection>
          
          <LazySection>
            <RecommendTools />
          </LazySection>
          
          <LazySection>
            <HotTools />
          </LazySection>
          
          {/* 分类推荐部分 */}
          <LazySection>
            <RecommendSection 
              title="Free" 
              tools={toolsData.freeTools}
            />
          </LazySection>
          
          <LazySection>
            <RecommendSection 
              title="Music" 
              tools={toolsData.musicTools}
            />
          </LazySection>
          
          <LazySection>
            <RecommendSection 
              title="Voice" 
              tools={toolsData.voiceTools}
            />
          </LazySection>
          
          <LazySection>
            <FAQ />
          </LazySection>
        </main>
        
        <LazySection threshold={0.5}>
          <Footer />
        </LazySection>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
