import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ToolCard from './ToolCard';

const hotTools = [
  {
    title: "GlobalGPT",
    description: "Pay Once, Access All Top AI Models & Agents. One-stop platform for Claude, GPT-4o, Midjourney, and more premium AI tools.",
    category: "Platform",
    image: "/globalgpt-screenshot.png"
  },
  {
    title: "GPT-4 Turbo",
    description: "The most advanced language model from OpenAI with enhanced capabilities and faster response times.",
    category: "Chatbot",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
  },
  {
    title: "DALL-E 3",
    description: "Create stunning, realistic images from text descriptions with the latest AI image generation technology.",
    category: "Picture",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop"
  },
  {
    title: "GitHub Copilot",
    description: "AI-powered code completion tool that helps developers write code faster and more efficiently.",
    category: "Office",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop"
  },
  {
    title: "Elevenlabs Voice AI",
    description: "Generate realistic voices and speech synthesis with advanced AI voice cloning technology.",
    category: "Voice",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop"
  },
  {
    title: "Midjourney V6",
    description: "The latest version of the popular AI image generator with improved quality and new features.",
    category: "Design & Art",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop"
  },
  {
    title: "Claude 3 Opus",
    description: "Anthropic's most capable AI assistant for complex reasoning and analysis tasks.",
    category: "Chatbot",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
  }
];

const HotTools = () => {
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
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Hot & Must-Have Tools</h2>
          
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
            {hotTools.map((tool, index) => (
              <div key={index} className="flex-none w-72 md:w-80">
                <ToolCard {...tool} size="large" />
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

export default HotTools;
