import React from 'react';
import ToolCard from './ToolCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  tools: Array<{
    title: string;
    description: string;
    category: string;
    image: string;
    stats?: string;
  }>;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, tools }) => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <Button variant="ghost" className="text-brand-purple hover:text-brand-purple/80 text-sm">
            💪 View All AI Tools
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} size="small" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
