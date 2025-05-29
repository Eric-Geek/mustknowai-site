import React from 'react';
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
  }
];

const JustLaunched = () => {
  return (
    <section className="pt-8 pb-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Just Launched</h2>
        
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scroll-container pb-4">
            {justLaunchedTools.map((tool, index) => (
              <div key={index} className="flex-none w-72 md:w-80">
                <ToolCard {...tool} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JustLaunched;
