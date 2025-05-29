import React from 'react';
import ToolCard from './ToolCard';

const hotTools = [
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
  }
];

const HotTools = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Hot & Must-Have Tools</h2>
        
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scroll-container pb-4">
            {hotTools.map((tool, index) => (
              <div key={index} className="flex-none w-72 md:w-80">
                <ToolCard {...tool} size="large" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotTools;
