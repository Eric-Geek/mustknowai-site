import React, { lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ErrorBoundary from '@/components/ErrorBoundary';
import LazySection, { SectionSkeleton } from '@/components/LazySection';
import { toolsData, getFeaturedTools } from '@/data/tools';
import { usePreloader } from '@/hooks/usePreloader';

// 懒加载组件
const JustLaunched = lazy(() => import('@/components/JustLaunched'));
const BannerAd = lazy(() => import('@/components/BannerAd'));
const RecommendTools = lazy(() => import('@/components/RecommendTools'));
const HotTools = lazy(() => import('@/components/HotTools'));
const RecommendSection = lazy(() => import('@/components/RecommendSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const Footer = lazy(() => import('@/components/Footer'));

// 自定义骨架屏组件
const HeroSkeleton = () => (
  <SectionSkeleton height="h-96" className="rounded-none" />
);

const RecommendSkeleton = () => (
  <div className="container mx-auto px-4 py-16">
    <SectionSkeleton height="h-8" className="w-48 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <SectionSkeleton key={i} height="h-64" />
      ))}
    </div>
  </div>
);

const Index: React.FC = () => {
  // 获取特色工具的图片用于预加载
  const featuredTools = getFeaturedTools();
  const featuredImages = featuredTools.map(tool => tool.image);

  // 预加载关键资源
  usePreloader({
    preloadImages: [
      // 预加载特色工具图片
      ...featuredImages,
      // 预加载其他关键图片
      '/images/hero-bg.webp',
      '/images/banner-ad.webp'
    ],
    preloadComponents: [
      () => import('@/components/JustLaunched'),
      () => import('@/components/RecommendTools'),
      () => import('@/components/HotTools')
    ],
    timeout: 3000
  });

  // 生成结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MustKnowAI",
    "alternateName": "Must Know AI",
    "url": "https://mustknowai.com",
    "description": "Discover thousands of AI tools across categories including ChatGPT alternatives, music generation, voice synthesis, and more.",
    "publisher": {
      "@type": "Organization",
      "name": "MustKnowAI",
      "url": "https://mustknowai.com"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mustknowai.com/discover?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "AI Tools Directory",
      "numberOfItems": toolsData.getAllTools().length,
      "itemListElement": featuredTools.slice(0, 5).map((tool, index) => ({
        "@type": "SoftwareApplication",
        "position": index + 1,
        "name": tool.title,
        "description": tool.description,
        "url": `https://mustknowai.com${tool.link}`,
        "applicationCategory": tool.category,
        "offers": {
          "@type": "Offer",
          "price": tool.pricing === 'free' ? "0" : tool.pricing === 'freemium' ? "0+" : "varies",
          "priceCurrency": "USD"
        }
      }))
    }
  };

  return (
    <ErrorBoundary>
      <Helmet>
        <title>MustKnowAI - Discover AI Tools to Make AI Work for You</title>
        <meta 
          name="description" 
          content="Explore thousands of AI tools across categories including ChatGPT alternatives, music generation, voice synthesis, and more. Find the perfect AI tool for your needs." 
        />
        <meta name="keywords" content="AI tools, artificial intelligence, ChatGPT, machine learning, voice synthesis, music generation, AI directory" />
        
        {/* Open Graph */}
        <meta property="og:title" content="MustKnowAI - AI Tools Directory" />
        <meta property="og:description" content="Discover the best AI tools for your needs. From ChatGPT alternatives to music generation and voice synthesis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mustknowai.com" />
        <meta property="og:image" content="https://mustknowai.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="MustKnowAI" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MustKnowAI - AI Tools Directory" />
        <meta name="twitter:description" content="Discover the best AI tools for your needs" />
        <meta name="twitter:image" content="https://mustknowai.com/og-image.jpg" />
        
        {/* Canonical and additional SEO */}
        <link rel="canonical" href="https://mustknowai.com" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="MustKnowAI Team" />
        
        {/* 预连接到外部资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://analytics.google.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* 结构化数据 */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* 关键内容立即加载 */}
        <Header />
        
        <main role="main">
          <HeroSection />
          
          {/* 非关键内容延迟加载 */}
          <LazySection
            threshold={0.1}
            rootMargin="100px"
            fallback={<HeroSkeleton />}
          >
            <JustLaunched />
          </LazySection>
          
          <LazySection
            threshold={0.1}
            fallback={<SectionSkeleton height="h-32" />}
          >
            <BannerAd />
          </LazySection>
          
          <LazySection
            threshold={0.1}
            rootMargin="100px"
            fallback={<RecommendSkeleton />}
          >
            <RecommendTools />
          </LazySection>
          
          <LazySection
            threshold={0.1}
            rootMargin="100px"
            fallback={<RecommendSkeleton />}
          >
            <HotTools />
          </LazySection>
          
          {/* 分类推荐部分 */}
          <LazySection
            threshold={0.05}
            rootMargin="50px"
            fallback={<RecommendSkeleton />}
          >
            <RecommendSection 
              title="Free Tools" 
              tools={toolsData.freeTools}
            />
          </LazySection>
          
          <LazySection
            threshold={0.05}
            rootMargin="50px"
            fallback={<RecommendSkeleton />}
          >
            <RecommendSection 
              title="Music & Audio" 
              tools={toolsData.musicTools}
            />
          </LazySection>
          
          <LazySection
            threshold={0.05}
            rootMargin="50px"
            fallback={<RecommendSkeleton />}
          >
            <RecommendSection 
              title="Voice & Speech" 
              tools={toolsData.voiceTools}
            />
          </LazySection>
          
          <LazySection
            threshold={0.1}
            fallback={<SectionSkeleton height="h-96" />}
          >
            <FAQ />
          </LazySection>
        </main>
        
        <LazySection 
          threshold={0.5}
          rootMargin="200px"
          fallback={<SectionSkeleton height="h-64" className="rounded-none" />}
        >
          <Footer />
        </LazySection>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
