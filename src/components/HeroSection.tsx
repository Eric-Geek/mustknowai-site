import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const categories = [
  { name: 'All Tools', active: true },
  { name: 'Free', active: false },
  { name: 'Music', active: false },
  { name: 'Voice', active: false },
  { name: 'Audio', active: false },
  { name: 'Picture', active: false },
  { name: 'Writing', active: false },
  { name: 'Office', active: false },
  { name: 'Design & Art', active: false },
  { name: 'Fashion', active: false },
  { name: 'Shopping', active: false },
  { name: 'Video', active: false },
  { name: 'Chatbot', active: false },
  { name: 'GPTs', active: false },
  { name: 'Game', active: false },
];

const HeroSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Tools');

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    // Navigate to discover page with category parameter
    const url = categoryName === 'All Tools' 
      ? '/discover' 
      : `/discover?category=${encodeURIComponent(categoryName)}`;
    window.location.href = url;
  };

  return (
    <section className="pt-8 pb-6 px-4">
      <div className="container mx-auto text-center">
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          Discover thousands of{' '}
          <span className="text-brand-purple">AI Tools</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Discover the latest and best AI tools for 2025 at AI With Me, let's explore the trends in AI and make AI work for us.
        </p>

        {/* Sponsored badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-sm text-purple-600 dark:text-purple-400 mb-6">
          👑 <span className="ml-1">Sponsored by </span>
          <a href="https://www.glbgpt.com/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline ml-1 text-blue-600 dark:text-blue-400">GlobalGPT</a>
          <span className="ml-1">↗</span>
        </div>

        {/* Search bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search AI tools for me..."
              className="w-full h-12 pl-6 pr-16 text-base rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:shadow-md transition-all"
            />
            <Button 
              size="sm"
              className="absolute right-2 top-2 h-8 w-8 p-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg"
              variant="ghost"
              onClick={() => window.location.href = '/discover'}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap hover:scale-105 ${
                activeCategory === category.name
                  ? 'bg-brand-purple text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
