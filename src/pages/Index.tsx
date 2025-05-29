
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import JustLaunched from '@/components/JustLaunched';
import BannerAd from '@/components/BannerAd';
import RecommendTools from '@/components/RecommendTools';
import HotTools from '@/components/HotTools';
import CategorySection from '@/components/CategorySection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

// Sample data for category sections
const freeTools = [
  {
    title: "ChatGPT Free",
    description: "Free access to OpenAI's powerful language model",
    category: "Free",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    stats: "10M+ users"
  },
  {
    title: "Hugging Face",
    description: "Open-source machine learning platform",
    category: "Free",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    stats: "5M+ models"
  },
  {
    title: "Google Colab",
    description: "Free cloud-based notebook environment",
    category: "Free",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    stats: "2M+ notebooks"
  },
  {
    title: "Canva AI",
    description: "Free AI-powered design tool",
    category: "Free",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    stats: "100M+ designs"
  }
];

const musicTools = [
  {
    title: "AIVA",
    description: "AI music composition for creators",
    category: "Music",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    stats: "500K+ compositions"
  },
  {
    title: "Amper Music",
    description: "AI-powered music creation platform",
    category: "Music",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    stats: "1M+ tracks"
  },
  {
    title: "Soundraw",
    description: "Generate royalty-free music with AI",
    category: "Music",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    stats: "200K+ beats"
  }
];

const voiceTools = [
  {
    title: "ElevenLabs",
    description: "Advanced AI voice synthesis",
    category: "Voice",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop",
    stats: "1M+ voices"
  },
  {
    title: "Murf AI",
    description: "AI voice generator for content",
    category: "Voice",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
    stats: "500K+ audio files"
  },
  {
    title: "Resemble AI",
    description: "Custom voice cloning platform",
    category: "Voice",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
    stats: "100K+ clones"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <JustLaunched />
      <BannerAd />
      <RecommendTools />
      <HotTools />
      <CategorySection title="Free" tools={freeTools} />
      <CategorySection title="Music" tools={musicTools} />
      <CategorySection title="Voice" tools={voiceTools} />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
