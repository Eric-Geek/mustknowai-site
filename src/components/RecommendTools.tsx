import React from 'react';
import { motion } from 'framer-motion';
import ToolCard from './ToolCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { getFeaturedTools } from '@/data/tools';

const RecommendTools = () => {
  const featuredTools = getFeaturedTools();
  
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/10 dark:via-gray-900 dark:to-purple-950/10" />
      
      <div className="container mx-auto relative z-10">
        {/* 标题区域 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
              精选推荐
            </span>
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              编辑精选工具
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            我们团队精心挑选的最优秀AI工具，每个都经过严格测试和评估
          </motion.p>
        </motion.div>

        {/* 工具网格 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {featuredTools.slice(0, 8).map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * index,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
            >
              <ToolCard 
                title={tool.title}
                description={tool.description}
                category={tool.category}
                image={tool.image}
                stats={tool.stats}
                featured={tool.featured}
                pricing={tool.pricing}
                isNew={tool.isNew}
                promoCode={tool.promoCode}
                size="medium"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 底部行动按钮 */}
        <motion.div 
          className="text-center"
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
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl px-8 py-6 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
              onClick={() => window.location.href = '/discover'}
            >
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ x: 2 }}
              >
                <Sparkles className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>发现更多AI工具</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.div>
            </Button>
          </motion.div>
          
          <motion.p 
            className="text-sm text-gray-500 dark:text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            探索 {featuredTools.length}+ 精选工具，发现AI的无限可能
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendTools;
