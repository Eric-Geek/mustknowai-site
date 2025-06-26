import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Zap, Brain, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'All Tools', active: true, icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { name: 'Free', active: false, icon: Zap, color: 'from-green-500 to-emerald-500' },
  { name: 'Music', active: false, icon: Wand2, color: 'from-blue-500 to-cyan-500' },
  { name: 'Voice', active: false, icon: Brain, color: 'from-orange-500 to-red-500' },
  { name: 'Audio', active: false, icon: Sparkles, color: 'from-indigo-500 to-purple-500' },
  { name: 'Picture', active: false, icon: Wand2, color: 'from-pink-500 to-rose-500' },
  { name: 'Writing', active: false, icon: Brain, color: 'from-teal-500 to-cyan-500' },
  { name: 'Office', active: false, icon: Zap, color: 'from-amber-500 to-orange-500' },
  { name: 'Design & Art', active: false, icon: Sparkles, color: 'from-violet-500 to-purple-500' },
  { name: 'Fashion', active: false, icon: Wand2, color: 'from-rose-500 to-pink-500' },
  { name: 'Shopping', active: false, icon: Brain, color: 'from-emerald-500 to-teal-500' },
  { name: 'Video', active: false, icon: Zap, color: 'from-red-500 to-orange-500' },
  { name: 'Chatbot', active: false, icon: Brain, color: 'from-blue-500 to-indigo-500' },
  { name: 'GPTs', active: false, icon: Sparkles, color: 'from-purple-500 to-indigo-500' },
  { name: 'Game', active: false, icon: Wand2, color: 'from-cyan-500 to-blue-500' },
];

// 特色功能卡片数据
const featuredCards = [
  {
    title: "AI 图像生成",
    description: "发现最新的AI图像生成工具",
    count: "200+",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    icon: Wand2
  },
  {
    title: "智能对话助手", 
    description: "强大的AI聊天和对话工具",
    count: "150+",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: Brain
  },
  {
    title: "音频生成",
    description: "音乐、语音合成等音频AI",
    count: "100+", 
    gradient: "from-orange-500 via-red-500 to-pink-500",
    icon: Sparkles
  }
];

const HeroSection = () => {
  const [activeCategory, setActiveCategory] = useState('All Tools');

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    // Navigate to discover page with category parameter
    const url = categoryName === 'All Tools' 
      ? '/discover' 
      : `/discover?category=${encodeURIComponent(categoryName)}`;
    window.location.href = url;
  };

  return (
    <section className="relative pt-8 pb-16 px-4 overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20" />
      
      {/* 装饰性元素 */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 right-4 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      
      <div className="container mx-auto text-center relative z-10">
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent">
              探索数千个
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              AI 工具
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            在 MustKnowAI 发现2025年最新最好的AI工具，让我们一起探索AI趋势，让AI为我们工作
          </motion.p>
        </motion.div>

        {/* 赞助商标记 */}
        <motion.div 
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800 text-sm text-purple-600 dark:text-purple-400 mb-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="text-lg mr-2">👑</span>
          <span>由 </span>
          <a href="https://www.glbgpt.com/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline ml-1 text-blue-600 dark:text-blue-400">
            GlobalGPT
          </a>
          <span className="ml-1"> 赞助 ↗</span>
        </motion.div>

        {/* 搜索栏 */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative">
              <Input
                type="text"
                placeholder="为我搜索AI工具..."
                className="w-full h-16 pl-8 pr-20 text-lg rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 focus:shadow-2xl transition-all duration-300"
              />
              <Button 
                size="lg"
                className="absolute right-3 top-3 h-10 w-10 p-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                variant="default"
                onClick={() => window.location.href = '/discover'}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* 特色功能卡片 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {featuredCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300`} />
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                      {card.count}
                    </span>
                    <span className="text-xs text-muted-foreground">工具</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 分类标签 */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.name
                    ? 'bg-white dark:bg-gray-800 text-foreground shadow-lg border border-purple-200 dark:border-purple-700'
                    : 'bg-white/60 dark:bg-gray-800/60 text-muted-foreground hover:bg-white dark:hover:bg-gray-800 hover:text-foreground hover:shadow-md backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.05 }}
              >
                {activeCategory === category.name && (
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl opacity-10`}
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
