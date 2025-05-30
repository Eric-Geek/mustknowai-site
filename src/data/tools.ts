export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  stats: string;
  link: string;
  featured?: boolean;
  tags?: string[];
  pricing?: 'free' | 'freemium' | 'paid';
}

// 免费工具
export const freeTools: Tool[] = [
  {
    id: 'chatgpt-free',
    title: "ChatGPT Free",
    description: "Free access to OpenAI's powerful language model",
    category: "Free",
    image: "/images/tools/chatgpt.webp",
    stats: "10M+ users",
    link: "/tool/chatgpt",
    featured: true,
    pricing: 'freemium',
    tags: ['conversational-ai', 'text-generation', 'coding']
  },
  {
    id: 'hugging-face',
    title: "Hugging Face",
    description: "Open-source machine learning platform",
    category: "Free",
    image: "/images/tools/huggingface.webp",
    stats: "5M+ models",
    link: "/tool/hugging-face",
    featured: true,
    pricing: 'freemium',
    tags: ['machine-learning', 'models', 'open-source']
  },
  {
    id: 'google-colab',
    title: "Google Colab",
    description: "Free cloud-based notebook environment",
    category: "Free",
    image: "/images/tools/colab.webp",
    stats: "2M+ notebooks",
    link: "/tool/google-colab",
    pricing: 'freemium',
    tags: ['notebook', 'python', 'cloud-computing']
  },
  {
    id: 'canva-ai',
    title: "Canva AI",
    description: "Free AI-powered design tool",
    category: "Free",
    image: "/images/tools/canva.webp",
    stats: "100M+ designs",
    link: "/tool/canva-ai",
    pricing: 'freemium',
    tags: ['design', 'graphics', 'templates']
  }
];

// 音乐工具
export const musicTools: Tool[] = [
  {
    id: 'aiva',
    title: "AIVA",
    description: "AI music composition for creators",
    category: "Music",
    image: "/images/tools/aiva.webp",
    stats: "500K+ compositions",
    link: "/tool/aiva",
    featured: true,
    pricing: 'freemium',
    tags: ['music-composition', 'ai-composer', 'soundtrack']
  },
  {
    id: 'amper-music',
    title: "Amper Music",
    description: "AI-powered music creation platform",
    category: "Music",
    image: "/images/tools/amper.webp",
    stats: "1M+ tracks",
    link: "/tool/amper-music",
    pricing: 'paid',
    tags: ['music-creation', 'background-music', 'royalty-free']
  },
  {
    id: 'soundraw',
    title: "Soundraw",
    description: "Generate royalty-free music with AI",
    category: "Music",
    image: "/images/tools/soundraw.webp",
    stats: "200K+ beats",
    link: "/tool/soundraw",
    pricing: 'freemium',
    tags: ['royalty-free', 'beats', 'music-generator']
  }
];

// 语音工具
export const voiceTools: Tool[] = [
  {
    id: 'elevenlabs',
    title: "ElevenLabs",
    description: "Advanced AI voice synthesis",
    category: "Voice",
    image: "/images/tools/elevenlabs.webp",
    stats: "1M+ voices",
    link: "/tool/elevenlabs",
    featured: true,
    pricing: 'freemium',
    tags: ['voice-synthesis', 'text-to-speech', 'voice-cloning']
  },
  {
    id: 'murf-ai',
    title: "Murf AI",
    description: "AI voice generator for content",
    category: "Voice",
    image: "/images/tools/murf.webp",
    stats: "500K+ audio files",
    link: "/tool/murf-ai",
    pricing: 'freemium',
    tags: ['voice-generator', 'content-creation', 'narration']
  },
  {
    id: 'resemble-ai',
    title: "Resemble AI",
    description: "Custom voice cloning platform",
    category: "Voice",
    image: "/images/tools/resemble.webp",
    stats: "100K+ clones",
    link: "/tool/resemble-ai",
    pricing: 'paid',
    tags: ['voice-cloning', 'custom-voice', 'speech-synthesis']
  }
];

// 获取所有工具
export const getAllTools = (): Tool[] => {
  return [...freeTools, ...musicTools, ...voiceTools];
};

// 获取特色工具
export const getFeaturedTools = (): Tool[] => {
  return getAllTools().filter(tool => tool.featured);
};

// 根据分类获取工具
export const getToolsByCategory = (category: string): Tool[] => {
  switch (category.toLowerCase()) {
    case 'free':
      return freeTools;
    case 'music':
      return musicTools;
    case 'voice':
      return voiceTools;
    default:
      return [];
  }
};

// 根据ID获取工具
export const getToolById = (id: string): Tool | undefined => {
  return getAllTools().find(tool => tool.id === id);
};

// 根据标签搜索工具
export const getToolsByTag = (tag: string): Tool[] => {
  return getAllTools().filter(tool => 
    tool.tags?.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

// 搜索工具
export const searchTools = (query: string): Tool[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllTools().filter(tool =>
    tool.title.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// 汇总所有工具数据
export const toolsData = {
  freeTools,
  musicTools,
  voiceTools,
  // 工具函数
  getAllTools,
  getFeaturedTools,
  getToolsByCategory,
  getToolById,
  getToolsByTag,
  searchTools
}; 