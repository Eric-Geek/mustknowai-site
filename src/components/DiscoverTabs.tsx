import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  color: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  count: number;
}

interface DiscoverTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeSubcategories?: string[];
  onSubcategoriesChange?: (subcategories: string[]) => void;
}

const DiscoverTabs: React.FC<DiscoverTabsProps> = ({
  activeCategory,
  onCategoryChange,
  activeSubcategories = [],
  onSubcategoriesChange = () => {}
}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories: Category[] = [
    { id: 'all', name: 'All Tools', icon: '🔥', count: 5000, color: 'bg-gray-500' },
    { id: 'chatbot', name: 'Chatbot', icon: '💬', count: 450, color: 'bg-blue-500',
      subcategories: [
        { id: 'customer-service', name: 'Customer Service', count: 120 },
        { id: 'virtual-assistant', name: 'Virtual Assistant', count: 80 },
        { id: 'conversational-ai', name: 'Conversational AI', count: 250 }
      ]
    },
    { id: 'image', name: 'Image Processing', icon: '🎨', count: 680, color: 'bg-purple-500',
      subcategories: [
        { id: 'generation', name: 'Image Generation', count: 200 },
        { id: 'editing', name: 'Image Editing', count: 180 },
        { id: 'enhancement', name: 'Image Enhancement', count: 150 },
        { id: 'background-removal', name: 'Background Removal', count: 150 }
      ]
    },
    { id: 'writing', name: 'Writing Tools', icon: '✍️', count: 520, color: 'bg-green-500',
      subcategories: [
        { id: 'content-creation', name: 'Content Creation', count: 200 },
        { id: 'copywriting', name: 'Copywriting', count: 150 },
        { id: 'translation', name: 'Translation Tools', count: 170 }
      ]
    },
    { id: 'productivity', name: 'Productivity', icon: '⚡', count: 380, color: 'bg-yellow-500',
      subcategories: [
        { id: 'automation', name: 'Automation', count: 120 },
        { id: 'scheduling', name: 'Scheduling', count: 100 },
        { id: 'note-taking', name: 'Note Taking', count: 160 }
      ]
    },
    { id: 'video', name: 'Video Processing', icon: '🎥', count: 290, color: 'bg-red-500',
      subcategories: [
        { id: 'video-generation', name: 'Video Generation', count: 80 },
        { id: 'video-editing', name: 'Video Editing', count: 120 },
        { id: 'animation', name: 'Animation', count: 90 }
      ]
    },
    { id: 'audio', name: 'Audio Processing', icon: '🎵', count: 220, color: 'bg-indigo-500',
      subcategories: [
        { id: 'voice-synthesis', name: 'Voice Synthesis', count: 80 },
        { id: 'music-generation', name: 'Music Generation', count: 70 },
        { id: 'audio-editing', name: 'Audio Editing', count: 70 }
      ]
    },
    { id: 'code', name: 'Developer Tools', icon: '👨‍💻', count: 340, color: 'bg-cyan-500',
      subcategories: [
        { id: 'code-generation', name: 'Code Generation', count: 150 },
        { id: 'debugging', name: 'Debugging Tools', count: 90 },
        { id: 'code-review', name: 'Code Review', count: 100 }
      ]
    },
    { id: 'business', name: 'Business Tools', icon: '💼', count: 410, color: 'bg-orange-500',
      subcategories: [
        { id: 'analytics', name: 'Data Analytics', count: 150 },
        { id: 'marketing', name: 'Marketing Tools', count: 130 },
        { id: 'finance', name: 'Finance Tools', count: 130 }
      ]
    },
    { id: 'education', name: 'Education', icon: '🎓', count: 280, color: 'bg-pink-500',
      subcategories: [
        { id: 'learning', name: 'Learning Assistant', count: 120 },
        { id: 'teaching', name: 'Teaching Tools', count: 80 },
        { id: 'research', name: 'Research Tools', count: 80 }
      ]
    },
  ];

  // 检查滚动状态
  const checkScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = 200;
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const activeMainCategory = categories.find(c => c.id === activeCategory);

  const handleSubcategoryToggle = (subId: string) => {
    const newSubcategories = activeSubcategories.includes(subId)
      ? activeSubcategories.filter(id => id !== subId)
      : [...activeSubcategories, subId];
    onSubcategoriesChange(newSubcategories);
  };

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto px-4">
        {/* 主分类标签栏 */}
        <div className="relative py-4">
          {/* 左侧滚动按钮 */}
          {canScrollLeft && (
            <button
              onClick={() => scrollTabs('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* 标签容器 */}
          <div
            ref={tabsContainerRef}
            onScroll={checkScroll}
            className="flex gap-2 overflow-x-auto scrollbar-hide px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  onSubcategoriesChange([]);
                }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                  transition-all duration-200 flex-shrink-0
                  ${activeCategory === category.id
                    ? `${category.color} text-white shadow-lg scale-105`
                    : 'bg-accent hover:bg-accent/80'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${activeCategory === category.id 
                    ? 'bg-white/20' 
                    : 'bg-muted-foreground/10'
                  }
                `}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* 右侧滚动按钮 */}
          {canScrollRight && (
            <button
              onClick={() => scrollTabs('right')}
              className="absolute right-12 top-1/2 -translate-y-1/2 z-10 p-2 bg-background rounded-full shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* 查看所有分类按钮 */}
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* 子分类标签栏 */}
        <AnimatePresence>
          {activeMainCategory?.subcategories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2 pb-4 flex-wrap">
                {activeMainCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubcategoryToggle(sub.id)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm transition-all
                      ${activeSubcategories.includes(sub.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent hover:bg-accent/80'
                      }
                    `}
                  >
                    {sub.name} ({sub.count})
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 活跃筛选标签 */}
        {activeSubcategories.length > 0 && (
          <div className="flex items-center gap-2 pb-4">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeSubcategories.map(subId => {
              const sub = activeMainCategory?.subcategories?.find(s => s.id === subId);
              return sub ? (
                <span
                  key={subId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {sub.name}
                  <button
                    onClick={() => handleSubcategoryToggle(subId)}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : null;
            })}
            <button
              onClick={() => onSubcategoriesChange([])}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* 全部分类弹出层 */}
      <AnimatePresence>
        {showAllCategories && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowAllCategories(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-0 top-0 h-full w-96 bg-background shadow-xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">All Categories</h2>
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="p-2 hover:bg-accent rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="border-b pb-4 last:border-b-0">
                    <button
                      onClick={() => {
                        onCategoryChange(category.id);
                        setShowAllCategories(false);
                      }}
                      className="w-full text-left hover:bg-accent p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-muted-foreground">{category.count}</span>
                      </div>
                    </button>
                    {category.subcategories && (
                      <div className="ml-12 mt-2 space-y-1">
                        {category.subcategories.map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between text-sm text-muted-foreground py-1">
                            <span>{sub.name}</span>
                            <span>{sub.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverTabs; 