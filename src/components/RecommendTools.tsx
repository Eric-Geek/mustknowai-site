import React from 'react';

const recommendedTools = [
  {
    name: "ChatGPT",
    description: "AI-powered conversational assistant",
    icon: "🤖",
    stats: "10M+ users",
    promoCode: "SAVE20"
  },
  {
    name: "Midjourney",
    description: "AI image generation platform",
    icon: "🎨",
    stats: "5M+ images created"
  },
  {
    name: "Claude",
    description: "Advanced AI assistant for complex tasks",
    icon: "🧠",
    stats: "2M+ users"
  },
  {
    name: "Runway ML",
    description: "AI video editing and generation",
    icon: "🎬",
    stats: "500K+ videos"
  },
  {
    name: "Notion AI",
    description: "AI-powered workspace and notes",
    icon: "📝",
    stats: "1M+ workspaces"
  },
  {
    name: "Copy.ai",
    description: "AI copywriting and content creation",
    icon: "✍️",
    stats: "800K+ users"
  },
  {
    name: "Jasper",
    description: "AI content marketing platform",
    icon: "📊",
    stats: "100K+ businesses"
  },
  {
    name: "Synthesia",
    description: "AI video creation with avatars",
    icon: "👤",
    stats: "300K+ videos"
  }
];

const RecommendTools = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Recommend Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedTools.map((tool, index) => (
            <div key={index} className="bg-card rounded-lg border border-border p-4 hover-lift cursor-pointer group">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-xl">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-brand-purple transition-colors text-sm">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {tool.stats}
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-3">
                {tool.description}
              </p>
              
              {tool.promoCode && (
                <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-md p-2 text-center">
                  <span className="text-brand-purple text-xs font-medium">
                    Code: {tool.promoCode}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendTools;
