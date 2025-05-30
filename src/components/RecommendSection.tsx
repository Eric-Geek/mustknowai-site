import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface Tool {
  title: string;
  description: string;
  category: string;
  image?: string;
  stats?: string;
  icon?: string;
}

interface RecommendSectionProps {
  title: string;
  tools: Tool[];
}

// Helper function to get category icon
const getCategoryIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    'Free': '🆓',
    'Music': '🎵',
    'Voice': '🎤',
    'Audio': '🔊',
    'Picture': '🖼️',
    'Writing': '✍️',
    'Office': '💼',
    'Design & Art': '🎨',
    'Fashion': '👗',
    'Shopping': '🛒',
    'Video': '🎬',
    'Chatbot': '🤖',
    'GPTs': '🧠',
    'Game': '🎮',
    'Education': '📚',
    'Code & IT': '💻',
    'Marketing': '📊',
    'Search': '🔍',
    'Business': '📈',
    'Analysis': '📋',
    'SEO': '🔎',
    'Prompt': '💭',
    '3D': '🎲',
    'Productivity': '⚡',
    'Lifestyle': '🌟',
    'Life Assistant': '🤝',
    'Translation': '🌐',
    'Travel': '✈️',
    'Career': '👔',
    'Food': '🍽️',
    'Health': '🏥',
    'Finance': '💰',
    'News': '📰',
    'Directory': '📂',
    'Platform': '🏗️',
    'Open Source': '🔓',
    'Community': '👥',
    'Research': '🔬',
    'Presentation': '📽️',
    'Privacy': '🔒',
    'Transcription': '📝',
    'Sales': '💼',
    'Sports': '⚽',
    'Entertainment': '🎭',
    'Data Extraction': '📊',
    'Analytics': '📈'
  };
  
  return iconMap[category] || '🔧';
};

const RecommendSection: React.FC<RecommendSectionProps> = ({ title, tools }) => {
  const handleViewAllClick = () => {
    // Navigate to discover page with category parameter
    const url = title === 'All Tools' 
      ? '/discover' 
      : `/discover?category=${encodeURIComponent(title)}`;
    window.location.href = url;
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <Button 
            variant="ghost" 
            className="text-brand-purple hover:text-brand-purple/80 text-sm"
            onClick={handleViewAllClick}
          >
            💪 View All AI Tools
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-4 hover-lift cursor-pointer group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-xl">
                  {tool.icon || getCategoryIcon(tool.category)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-brand-purple transition-colors text-sm">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {tool.stats || 'Popular tool'}
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">
                {tool.description}
              </p>
              
              <div className="bg-accent/50 border border-border rounded-md p-2 text-center">
                <span className="text-brand-purple text-xs font-medium">
                  {tool.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendSection; 