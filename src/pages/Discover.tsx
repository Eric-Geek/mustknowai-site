import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import DiscoverTabs from '@/components/DiscoverTabs';
import DiscoverFilters from '@/components/DiscoverFilters';
import ToolGrid from '@/components/ToolGrid';
import { SearchEnhanced } from '@/components/SearchEnhanced';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/api/client';
import { useStore } from '@/store/useStore';
import { useMeta } from '@/hooks/useMeta';
import { getAllTools } from '@/data/tools';

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchHistory, addSearchHistory } = useStore();
  
  // URL参数状态
  const category = searchParams.get('category') || 'all';
  const subcategories = searchParams.getAll('sub');
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'trending';
  const pricing = searchParams.getAll('pricing');
  const features = searchParams.getAll('features');
  
  // 本地状态
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>(subcategories);
  const [filters, setFilters] = useState({
    pricing: pricing,
    rating: [0],
    features: features,
    integration: [] as string[],
    language: [] as string[]
  });

  // SEO设置
  useMeta({
    title: `Discover AI Tools ${category !== 'all' ? `- ${category}` : ''} | MustKnowAI`,
    description: `Discover the latest and best AI tools. Browse over 5000 AI tools and find the perfect solution for your needs.`,
    keywords: ['AI tools', 'artificial intelligence', 'tool discovery', 'AI directory', category],
    canonicalUrl: `https://mustknowai.com/discover${window.location.search}`
  });

  // 获取工具数据 - 使用无限查询
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['discover-tools', category, activeSubcategories, searchQuery, sortBy, filters],
    queryFn: ({ pageParam = 1 }) => {
      // 在API准备好之前，使用本地数据
      const allTools = getAllTools();
      let filteredTools = allTools;

      // 分类筛选
      if (category !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === category);
      }

      // 子分类筛选
      if (activeSubcategories.length > 0) {
        filteredTools = filteredTools.filter(tool => 
          activeSubcategories.some(sub => tool.tags?.includes(sub))
        );
      }

      // 搜索筛选
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredTools = filteredTools.filter(tool =>
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // 价格筛选
      if (filters.pricing.length > 0) {
        filteredTools = filteredTools.filter(tool => 
          filters.pricing.includes(tool.pricing)
        );
      }

      // 排序
      switch (sortBy) {
        case 'newest':
          filteredTools.sort((a, b) => a.id.localeCompare(b.id));
          break;
        case 'popular':
          filteredTools.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
        case 'rating':
          filteredTools.sort((a, b) => Math.random() - 0.5); // 随机排序模拟评分
          break;
        case 'name':
          filteredTools.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default: // trending
          filteredTools.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }

      // 分页
      const pageSize = 20;
      const startIndex = (pageParam - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageTools = filteredTools.slice(startIndex, endIndex);

      return {
        tools: pageTools,
        hasMore: endIndex < filteredTools.length,
        total: filteredTools.length,
        page: pageParam
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const tools = data?.pages.flatMap(page => page.tools) || [];
  const totalTools = data?.pages[0]?.total || 0;

  // 处理分类变化
  const handleCategoryChange = useCallback((newCategory: string) => {
    setSearchParams(prev => {
      prev.set('category', newCategory);
      prev.delete('sub'); // 清除子分类
      return prev;
    });
    setActiveSubcategories([]);
  }, [setSearchParams]);

  // 处理子分类变化
  const handleSubcategoriesChange = useCallback((newSubcategories: string[]) => {
    setActiveSubcategories(newSubcategories);
    setSearchParams(prev => {
      prev.delete('sub');
      newSubcategories.forEach(sub => prev.append('sub', sub));
      return prev;
    });
  }, [setSearchParams]);

  // 处理搜索
  const handleSearch = useCallback((results: any[], query?: string) => {
    const searchQuery = query || '';
    if (searchQuery && searchQuery !== searchParams.get('q')) {
      addSearchHistory(searchQuery);
    }
    setSearchParams(prev => {
      if (searchQuery) {
        prev.set('q', searchQuery);
      } else {
        prev.delete('q');
      }
      return prev;
    });
  }, [setSearchParams, addSearchHistory, searchParams]);

  // 处理排序变化
  const handleSortChange = useCallback((newSort: string) => {
    setSearchParams(prev => {
      prev.set('sort', newSort);
      return prev;
    });
  }, [setSearchParams]);

  // 处理筛选器变化
  const handleFiltersChange = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setSearchParams(prev => {
      // 清除现有筛选参数
      prev.delete('pricing');
      prev.delete('features');
      
      // 添加新的筛选参数
      newFilters.pricing.forEach((p: string) => prev.append('pricing', p));
      newFilters.features.forEach((f: string) => prev.append('features', f));
      
      return prev;
    });
  }, [setSearchParams]);

  // 处理工具点击
  const handleToolClick = useCallback((tool: any) => {
    navigate(`/tool/${tool.id}`);
  }, [navigate]);

  // 清除所有筛选
  const clearAllFilters = useCallback(() => {
    setSearchParams({});
    setActiveSubcategories([]);
    setFilters({
      pricing: [],
      rating: [0],
      features: [],
      integration: [],
      language: []
    });
  }, [setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* 粘性分类标签栏 */}
      <DiscoverTabs
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
        activeSubcategories={activeSubcategories}
        onSubcategoriesChange={handleSubcategoriesChange}
      />

      <div className="container mx-auto px-4 py-6">
        {/* 搜索和筛选栏 */}
        <div className="space-y-6 mb-8">
          {/* 搜索栏 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <SearchEnhanced
                data={tools}
                searchKeys={['title', 'description', 'tags']}
                onResults={handleSearch}
                placeholder="Search AI tools..."
              />
            </div>
            
            <div className="flex gap-2">
              <DiscoverFilters
                onFiltersChange={handleFiltersChange}
              />
              
              {/* 排序选择 */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              {/* 视图切换 */}
              <div className="flex gap-1 bg-accent rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 活跃筛选标签 */}
          {(activeSubcategories.length > 0 || filters.pricing.length > 0 || filters.features.length > 0 || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="text-sm text-muted-foreground">Active Filters:</span>
              
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <button
                    onClick={() => handleSearch([], '')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              )}

              {filters.pricing.map(price => (
                <Badge key={price} variant="secondary">
                  {price === 'free' ? 'Free' : price === 'freemium' ? 'Free Plus' : 'Paid'}
                </Badge>
              ))}

              {filters.features.map(feature => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            </motion.div>
          )}
        </div>

        {/* 结果统计 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground">
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  Found <span className="font-semibold text-primary">{totalTools}</span> AI tools
                  {category !== 'all' && (
                    <span> in <span className="font-semibold">{category}</span> category</span>
                  )}
                </>
              )}
            </p>
            {!isLoading && totalTools > 0 && (
              <Badge variant="outline">
                Displaying {tools.length} / {totalTools}
              </Badge>
            )}
          </div>
          
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSearch([], '')}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear Search
            </Button>
          )}
        </div>

        {/* 工具网格/列表 */}
        {error ? (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">Error loading tools, please try again later.</p>
            <Button onClick={() => refetch()}>Reload</Button>
          </div>
        ) : (
          <div className="space-y-8">
            <ToolGrid
              tools={tools}
              viewMode={viewMode}
              isLoading={isLoading}
              onToolClick={handleToolClick}
            />

            {/* 加载更多 */}
            {hasNextPage && (
              <div className="text-center py-8">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  size="lg"
                  className="px-8"
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More Tools'}
                </Button>
              </div>
            )}

            {/* 无更多结果 */}
            {!hasNextPage && tools.length > 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Displayed all results</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Discover; 