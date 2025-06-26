import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { getToolId, hasToolDetail } from '@/lib/toolMapping';

interface ToolCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  isNew?: boolean;
  promoCode?: string;
  stats?: string;
  size?: 'small' | 'medium' | 'large';
  featured?: boolean;
  pricing?: 'free' | 'freemium' | 'paid';
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  category,
  image,
  isNew = false,
  promoCode,
  stats,
  size = 'medium',
  featured = false,
  pricing = 'freemium'
}) => {
  const cardClasses = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const imageClasses = {
    small: 'h-32',
    medium: 'h-40',
    large: 'h-48'
  };

  const toolId = getToolId(title);
  const hasDetail = hasToolDetail(title);

  // 根据定价类型设置颜色
  const getPricingColor = () => {
    switch (pricing) {
      case 'free':
        return 'from-green-500 to-emerald-500';
      case 'freemium':
        return 'from-blue-500 to-cyan-500';
      case 'paid':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPricingText = () => {
    switch (pricing) {
      case 'free':
        return '免费';
      case 'freemium':
        return '免费试用';
      case 'paid':
        return '付费';
      default:
        return '';
    }
  };

  const CardContent = () => (
    <motion.div 
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden ${cardClasses[size]} transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700`}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 特色工具光环效果 */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* 顶部标记区域 */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
        {/* 左侧标记 */}
        <div className="flex gap-2">
          {featured && (
            <motion.div 
              className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-3 w-3" />
              <span>精选</span>
            </motion.div>
          )}
          
          {isNew && (
            <motion.div 
              className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Zap className="h-3 w-3" />
              <span>最新</span>
            </motion.div>
          )}
        </div>

        {/* 右侧定价标记 */}
        {pricing && (
          <motion.div 
            className={`bg-gradient-to-r ${getPricingColor()} text-white text-xs px-2 py-1 rounded-full shadow-lg`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            {getPricingText()}
          </motion.div>
        )}
      </div>

      {/* 图片区域 */}
      <div className={`${imageClasses[size]} mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative`}>
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* 图片遮罩层 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 内容区域 */}
      <div className="space-y-3 relative z-10">
        {/* 分类标签 */}
        <motion.div 
          className="inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium border border-gray-200 dark:border-gray-600">
            {category}
          </span>
        </motion.div>

        {/* 标题 */}
        <motion.h3 
          className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
          whileHover={{ x: 2 }}
        >
          {title}
        </motion.h3>
        
        {/* 描述 */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* 统计数据 */}
        {stats && (
          <motion.div 
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            <TrendingUp className="h-3 w-3" />
            <span>{stats}</span>
          </motion.div>
        )}

        {/* 优惠码 */}
        {promoCode && (
          <motion.div 
            className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="text-purple-600 dark:text-purple-400 text-xs font-semibold">
              优惠码: {promoCode}
            </span>
          </motion.div>
        )}

        {/* 操作按钮 */}
        <motion.div 
          className="pt-2"
          whileHover={{ scale: 1.02 }}
        >
          <Button 
            size="sm" 
            className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
          >
            <motion.div 
              className="flex items-center justify-center gap-2"
              whileHover={{ x: 2 }}
            >
              <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform duration-300" />
              <span>{hasDetail ? '查看详情' : '访问工具'}</span>
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* 悬停时的光效 */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );

  // If the tool has a detail page, wrap with Link
  if (hasDetail) {
    return (
      <Link to={`/tool/${toolId}`} className="block">
        <CardContent />
      </Link>
    );
  }

  // Otherwise, return the card without Link wrapper
  return <CardContent />;
};

export default ToolCard;
