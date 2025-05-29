
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { name: 'All Tools', active: false },
  { name: 'Free', active: false },
  { name: 'Music', active: false },
  { name: 'Voice', active: false },
  { name: 'Audio', active: false },
  { name: 'Picture', active: false },
  { name: 'Writing', active: true },
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
  const [activeCategory, setActiveCategory] = useState('Writing');

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center">
        {/* Sponsored badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-sm text-brand-purple mb-8">
          <span>Sponsored by </span>
          <a href="#" className="font-medium hover:underline ml-1">TechPartner</a>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Discover thousands of{' '}
          <span className="text-brand-purple">AI tools</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore the latest and best AI tools for 2025 on MustKnowAI.
        </p>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search AI tools for me…"
              className="w-full h-14 px-6 text-lg rounded-2xl bg-card border-border focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
            />
            <Button 
              className="absolute right-2 top-2 h-10 px-6 bg-brand-purple hover:bg-brand-purple/90"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.name || category.active
                  ? 'bg-brand-purple text-white'
                  : 'bg-card text-muted-foreground hover:bg-accent hover:text-foreground'
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
