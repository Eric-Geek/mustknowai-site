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
  isNew?: boolean;
  promoCode?: string;
}

// 免费工具
export const freeTools: Tool[] = [
  {
    id: 'chatgpt-free',
    title: "ChatGPT",
    description: "OpenAI开发的强大对话AI，免费版本提供基础功能",
    category: "对话AI",
    image: "/icons/tools/chatgpt-icon.svg",
    stats: "1000万+ 用户",
    link: "/tool/chatgpt",
    featured: true,
    pricing: 'freemium',
    tags: ['对话AI', '文本生成', '编程助手']
  },
  {
    id: 'hugging-face',
    title: "Hugging Face",
    description: "开源机器学习平台，提供大量免费AI模型",
    category: "机器学习",
    image: "/images/tools/huggingface.webp",
    stats: "500万+ 模型",
    link: "/tool/hugging-face",
    featured: true,
    pricing: 'freemium',
    tags: ['机器学习', '模型库', '开源']
  },
  {
    id: 'google-colab',
    title: "Google Colab",
    description: "免费的云端Jupyter笔记本环境，支持GPU",
    category: "开发工具",
    image: "/images/tools/colab.webp",
    stats: "200万+ 笔记本",
    link: "/tool/google-colab",
    pricing: 'freemium',
    tags: ['笔记本', 'Python', '云计算']
  },
  {
    id: 'canva-ai',
    title: "Canva AI",
    description: "AI驱动的设计工具，快速创建专业设计",
    category: "设计工具",
    image: "/images/tools/canva.webp",
    stats: "1亿+ 设计",
    link: "/tool/canva-ai",
    pricing: 'freemium',
    tags: ['设计', '图形', '模板'],
    isNew: true
  },
  {
    id: 'stable-diffusion',
    title: "Stable Diffusion",
    description: "开源AI图像生成模型，完全免费使用",
    category: "图像生成",
    image: "/icons/tools/stable-diffusion-icon.svg",
    stats: "500万+ 图像",
    link: "/tool/stable-diffusion",
    pricing: 'free',
    featured: true,
    tags: ['图像生成', '开源', 'AI艺术']
  }
];

// 音乐工具
export const musicTools: Tool[] = [
  {
    id: 'aiva',
    title: "AIVA",
    description: "AI音乐作曲家，为创作者生成专业级音乐",
    category: "音乐创作",
    image: "/images/tools/aiva.webp",
    stats: "50万+ 作品",
    link: "/tool/aiva",
    featured: true,
    pricing: 'freemium',
    tags: ['音乐作曲', 'AI作曲家', '配乐']
  },
  {
    id: 'mubert',
    title: "Mubert",
    description: "实时AI音乐生成，为内容创作者提供无版权音乐",
    category: "音乐创作",
    image: "/images/tools/mubert.webp",
    stats: "100万+ 音轨",
    link: "/tool/mubert",
    pricing: 'freemium',
    tags: ['音乐生成', '无版权音乐', '实时生成'],
    promoCode: "NEWUSER50"
  },
  {
    id: 'soundraw',
    title: "Soundraw",
    description: "AI驱动的音乐生成器，创建独特的背景音乐",
    category: "音乐创作",
    image: "/images/tools/soundraw.webp",
    stats: "20万+ 节拍",
    link: "/tool/soundraw",
    pricing: 'freemium',
    tags: ['无版权音乐', '节拍', '音乐生成器']
  },
  {
    id: 'boomy',
    title: "Boomy",
    description: "几秒钟内创建原创歌曲的AI音乐平台",
    category: "音乐创作",
    image: "/images/tools/boomy.webp",
    stats: "1000万+ 歌曲",
    link: "/tool/boomy",
    pricing: 'freemium',
    tags: ['歌曲创作', 'AI音乐', '快速生成'],
    isNew: true
  }
];

// 语音工具
export const voiceTools: Tool[] = [
  {
    id: 'elevenlabs',
    title: "ElevenLabs",
    description: "最先进的AI语音合成和语音克隆技术",
    category: "语音合成",
    image: "/images/tools/elevenlabs.webp",
    stats: "100万+ 语音",
    link: "/tool/elevenlabs",
    featured: true,
    pricing: 'freemium',
    tags: ['语音合成', '文本转语音', '语音克隆']
  },
  {
    id: 'murf-ai',
    title: "Murf AI",
    description: "专业级AI语音生成器，适用于内容创作",
    category: "语音合成",
    image: "/images/tools/murf.webp",
    stats: "50万+ 音频文件",
    link: "/tool/murf-ai",
    pricing: 'freemium',
    tags: ['语音生成器', '内容创作', '配音']
  },
  {
    id: 'resemble-ai',
    title: "Resemble AI",
    description: "定制语音克隆平台，创建独特的AI语音",
    category: "语音合成",
    image: "/images/tools/resemble.webp",
    stats: "10万+ 克隆",
    link: "/tool/resemble-ai",
    pricing: 'paid',
    tags: ['语音克隆', '定制语音', '语音合成']
  },
  {
    id: 'speechify',
    title: "Speechify",
    description: "AI文本转语音工具，提升阅读效率",
    category: "语音合成",
    image: "/images/tools/speechify.webp",
    stats: "2000万+ 用户",
    link: "/tool/speechify",
    pricing: 'freemium',
    tags: ['文本转语音', '阅读助手', '学习工具'],
    isNew: true
  }
];

// 图像生成工具
export const imageTools: Tool[] = [
  {
    id: 'midjourney',
    title: "Midjourney",
    description: "顶级AI图像生成工具，创作惊艳的艺术作品",
    category: "图像生成",
    image: "/icons/tools/midjourney-icon.svg",
    stats: "1500万+ 图像",
    link: "/tool/midjourney",
    featured: true,
    pricing: 'paid',
    tags: ['图像生成', 'AI艺术', '创意设计']
  },
  {
    id: 'dalle-3',
    title: "DALL-E 3",
    description: "OpenAI最新的图像生成模型，理解复杂提示",
    category: "图像生成",
    image: "/images/tools/dalle.webp",
    stats: "1000万+ 图像",
    link: "/tool/dalle-3",
    featured: true,
    pricing: 'freemium',
    tags: ['图像生成', 'OpenAI', '文本到图像'],
    isNew: true
  },
  {
    id: 'leonardo-ai',
    title: "Leonardo AI",
    description: "专业级AI图像生成平台，适合创意工作者",
    category: "图像生成",
    image: "/images/tools/leonardo.webp",
    stats: "500万+ 图像",
    link: "/tool/leonardo-ai",
    pricing: 'freemium',
    tags: ['图像生成', '专业设计', 'AI艺术']
  }
];

// 视频生成工具
export const videoTools: Tool[] = [
  {
    id: 'runway-ml',
    title: "Runway",
    description: "AI视频生成和编辑的专业平台",
    category: "视频制作",
    image: "/icons/tools/runway-icon.svg",
    stats: "200万+ 视频",
    link: "/tool/runway-ml",
    featured: true,
    pricing: 'freemium',
    tags: ['视频生成', '视频编辑', 'AI特效']
  },
  {
    id: 'pika-labs',
    title: "Pika Labs",
    description: "文本到视频的AI生成工具",
    category: "视频制作",
    image: "/images/tools/pika.webp",
    stats: "100万+ 视频",
    link: "/tool/pika-labs",
    pricing: 'freemium',
    tags: ['文本到视频', '视频生成', 'AI动画'],
    isNew: true
  }
];

// 写作工具
export const writingTools: Tool[] = [
  {
    id: 'jasper-ai',
    title: "Jasper",
    description: "企业级AI写作助手，提升内容创作效率",
    category: "写作助手",
    image: "/images/tools/jasper.webp",
    stats: "10万+ 企业用户",
    link: "/tool/jasper-ai",
    pricing: 'paid',
    tags: ['写作助手', '内容营销', '企业工具']
  },
  {
    id: 'notion-ai',
    title: "Notion AI",
    description: "集成在Notion中的AI写作和思考助手",
    category: "写作助手",
    image: "/icons/tools/notion-icon.svg",
    stats: "3000万+ 用户",
    link: "/tool/notion-ai",
    pricing: 'freemium',
    tags: ['写作助手', '笔记工具', '思维整理'],
    featured: true
  }
];

// 获取所有工具
export const getAllTools = (): Tool[] => {
  return [...freeTools, ...musicTools, ...voiceTools, ...imageTools, ...videoTools, ...writingTools];
};

// 获取特色工具
export const getFeaturedTools = (): Tool[] => {
  return getAllTools().filter(tool => tool.featured);
};

// 获取最新工具
export const getNewTools = (): Tool[] => {
  return getAllTools().filter(tool => tool.isNew);
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
    case 'image':
    case 'picture':
      return imageTools;
    case 'video':
      return videoTools;
    case 'writing':
      return writingTools;
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

// 按定价类型获取工具
export const getToolsByPricing = (pricing: 'free' | 'freemium' | 'paid'): Tool[] => {
  return getAllTools().filter(tool => tool.pricing === pricing);
};

// 获取有优惠码的工具
export const getToolsWithPromo = (): Tool[] => {
  return getAllTools().filter(tool => tool.promoCode);
};

// 汇总所有工具数据
export const toolsData = {
  freeTools,
  musicTools,
  voiceTools,
  imageTools,
  videoTools,
  writingTools,
  // 工具函数
  getAllTools,
  getFeaturedTools,
  getNewTools,
  getToolsByCategory,
  getToolById,
  getToolsByTag,
  searchTools,
  getToolsByPricing,
  getToolsWithPromo
}; 