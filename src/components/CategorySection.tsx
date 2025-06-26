import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Palette, 
  Music, 
  Mic, 
  Video, 
  FileText, 
  Briefcase, 
  Camera,
  ShoppingBag,
  Gamepad2,
  Bot,
  Zap,
  Sparkles,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  toolCount: number;
  featured: boolean;
  examples: string[];
}

const categories: Category[] = [
  {
    id: 'chatbot',
    title: '智能对话',
    description: '强大的AI聊天机器人和对话助手',
    icon: Bot,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    toolCount: 150,
    featured: true,
    examples: ['ChatGPT', 'Claude', 'Gemini']
  },
  {
    id: 'image',
    title: '图像生成',
    description: 'AI驱动的图像创作和编辑工具',
    icon: Palette,
    gradient: 'from-purple-500 via-pink-500 to-red-500',
    toolCount: 200,
    featured: true,
    examples: ['Midjourney', 'DALL-E', 'Stable Diffusion']
  },
  {
    id: 'music',
    title: '音乐创作',
    description: 'AI音乐生成和音频处理工具',
    icon: Music,
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    toolCount: 80,
    featured: true,
    examples: ['AIVA', 'Soundraw', 'Mubert']
  },
  {
    id: 'voice',
    title: '语音合成',
    description: '文本转语音和语音克隆技术',
    icon: Mic,
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    toolCount: 60,
    featured: false,
    examples: ['ElevenLabs', 'Murf', 'Resemble']
  },
  {
    id: 'video',
    title: '视频制作',
    description: 'AI视频生成和编辑工具',
    icon: Video,
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    toolCount: 90,
    featured: false,
    examples: ['Runway', 'Pika Labs', 'Synthesia']
  },
  {
    id: 'writing',
    title: '写作助手',
    description: 'AI写作和内容创作工具',
    icon: FileText,
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    toolCount: 120,
    featured: false,
    examples: ['Jasper', 'Copy.ai', 'Writesonic']
  }
];

interface CategorySectionProps {
  onCategorySelect?: (categoryId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onCategorySelect }) => {
  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    } else {
      // 默认导航到发现页面
      window.location.href = `/discover?category=${categoryId}`;
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20" />
      
      <div className="container mx-auto relative z-10">
        {/* 标题区域 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
              探索AI工具分类
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            从对话机器人到图像生成，从音乐创作到视频制作，发现适合你需求的AI工具
          </motion.p>
        </motion.div>

        {/* 分类网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* 特色标记 */}
                {category.featured && (
                  <motion.div 
                    className="absolute -top-3 -right-3 z-20"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>热门</span>
                    </div>
                  </motion.div>
                )}
                
                {/* 主卡片 */}
                <div 
                  className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-500 cursor-pointer group-hover:shadow-2xl group-hover:shadow-purple-500/10 group-hover:border-purple-300 dark:group-hover:border-purple-700 overflow-hidden"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {/* 背景渐变效果 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* 图标区域 */}
                  <motion.div 
                    className="relative z-10 mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* 内容区域 */}
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      {category.title}
                    </motion.h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* 工具数量 */}
                    <motion.div 
                      className="flex items-center justify-between mb-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className={`text-3xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                        {category.toolCount}+
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">工具</span>
                    </motion.div>
                    
                    {/* 示例工具 */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">热门工具:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.examples.map((example, i) => (
                          <motion.span
                            key={example}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 + i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {example}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    {/* 操作按钮 */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category.id);
                        }}
                      >
                        <motion.div 
                          className="flex items-center justify-center gap-2"
                          whileHover={{ x: 2 }}
                        >
                          <span>探索 {category.title}</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.div>
                        </motion.div>
                      </Button>
                    </motion.div>
                  </div>
                  
                  {/* 悬停光效 */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* 底部号召行动 */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white border-0 rounded-2xl px-8 py-6 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              onClick={() => window.location.href = '/discover'}
            >
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ x: 2 }}
              >
                <Zap className="h-5 w-5" />
                <span>查看所有工具</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
