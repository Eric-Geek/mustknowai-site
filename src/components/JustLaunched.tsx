import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ToolCard from './ToolCard';

const justLaunchedTools = [
  {
    title: "AI Video Generator Pro",
    description: "Create stunning videos with AI in minutes. Perfect for content creators and marketers.",
    category: "Video",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    isNew: true
  },
  {
    title: "Smart Writing Assistant",
    description: "AI-powered writing tool that helps you create engaging content with perfect grammar.",
    category: "Writing",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    isNew: true
  },
  {
    title: "Voice Clone Studio",
    description: "Clone any voice with advanced AI technology. Perfect for podcasters and creators.",
    category: "Voice",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    isNew: true
  },
  {
    title: "Design AI Studio",
    description: "Generate beautiful designs and artwork using advanced AI algorithms.",
    category: "Design & Art",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    isNew: true
  },
  {
    title: "Music AI Composer",
    description: "Compose original music tracks with AI. Perfect for content creators and musicians.",
    category: "Music",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    isNew: true
  },
  {
    title: "Code Assistant Pro",
    description: "Advanced AI coding assistant for faster development and better code quality.",
    category: "Code & IT",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe19c7b4e?w=400&h=300&fit=crop",
    isNew: true
  }
];

const JustLaunched = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of one card plus gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="pt-8 pb-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Just Launched</h2>
          
          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="h-10 w-10 rounded-full border-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="h-10 w-10 rounded-full border-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative group">
          {/* Left gradient overlay */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          )}
          
          {/* Right gradient overlay */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          )}
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgb(156 163 175) transparent'
            }}
          >
            {justLaunchedTools.map((tool, index) => (
              <div key={index} className="flex-none w-72 md:w-80">
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
          
          {/* Mobile scroll hint */}
          <div className="md:hidden mt-2 text-center">
            <span className="text-xs text-muted-foreground">
              👈 Swipe to see more tools
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JustLaunched;
