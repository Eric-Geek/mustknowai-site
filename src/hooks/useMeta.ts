import { useEffect } from 'react';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  ogType?: string;
  twitterCard?: string;
  author?: string;
  robots?: string;
  viewport?: string;
}

export const useMeta = ({
  title = 'MustKnowAI - Discover AI Tools',
  description = 'Discover thousands of AI tools to make AI work for you',
  keywords = ['AI tools', 'artificial intelligence', 'machine learning', 'ChatGPT', 'AI directory'],
  ogImage = '/og-default.jpg',
  canonicalUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author = 'MustKnowAI Team',
  robots = 'index, follow',
  viewport = 'width=device-width, initial-scale=1'
}: MetaProps) => {
  useEffect(() => {
    // 更新标题
    document.title = title;
    
    // 更新或创建 meta 标签的通用函数
    const updateMetaTag = (selector: string, content: string, attribute = 'content') => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        
        // 根据选择器设置相应的属性
        if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) element.setAttribute('property', property);
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        }
        
        document.head.appendChild(element);
      }
      
      element.setAttribute(attribute, content);
    };

    // 更新或创建 link 标签的通用函数
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      
      element.href = href;
    };
    
    // 基础 meta 标签
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="keywords"]', keywords.join(', '));
    updateMetaTag('meta[name="author"]', author);
    updateMetaTag('meta[name="robots"]', robots);
    updateMetaTag('meta[name="viewport"]', viewport);
    
    // Open Graph 标签
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[property="og:type"]', ogType);
    updateMetaTag('meta[property="og:site_name"]', 'MustKnowAI');
    
    // 如果提供了 canonical URL，则设置 og:url
    if (canonicalUrl) {
      updateMetaTag('meta[property="og:url"]', canonicalUrl);
    }
    
    // Twitter Card 标签
    updateMetaTag('meta[name="twitter:card"]', twitterCard);
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image"]', ogImage);
    
    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
    }
    
    // 清理函数 - 在组件卸载时恢复默认值
    return () => {
      // 可以选择在这里恢复默认的 meta 标签
      // 但通常不需要，因为新页面会覆盖这些值
    };
  }, [title, description, keywords, ogImage, canonicalUrl, ogType, twitterCard, author, robots, viewport]);

  // 返回一些有用的函数
  return {
    setTitle: (newTitle: string) => {
      document.title = newTitle;
    },
    
    setDescription: (newDescription: string) => {
      const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDescription) {
        metaDescription.content = newDescription;
      }
    },
    
    addStructuredData: (data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      
      // 返回清理函数
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  };
};

// 预定义的一些常用配置
export const createToolDetailMeta = (toolName: string, toolDescription: string) => ({
  title: `${toolName} - AI Tool Details | MustKnowAI`,
  description: toolDescription,
  keywords: ['AI tool', toolName, 'artificial intelligence', 'tool review'],
  ogType: 'article',
});

export const createCategoryMeta = (categoryName: string) => ({
  title: `${categoryName} AI Tools - MustKnowAI`,
  description: `Discover the best ${categoryName.toLowerCase()} AI tools. Browse our curated collection of AI-powered solutions.`,
  keywords: [categoryName, 'AI tools', 'artificial intelligence', 'category'],
});

export const createSearchMeta = (query: string) => ({
  title: `Search Results for "${query}" - MustKnowAI`,
  description: `Find AI tools related to "${query}". Search through thousands of AI tools and discover the perfect solution.`,
  keywords: [query, 'search', 'AI tools', 'find tools'],
  robots: 'noindex, follow', // 通常不索引搜索结果页
}); 