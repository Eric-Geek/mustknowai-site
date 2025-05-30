import React from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Star, ExternalLink, Users, Zap, Crown, Heart } from 'lucide-react';
import { Tool } from '@/data/tools';
import OptimizedImage from '@/components/OptimizedImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ToolGridProps {
  tools: Tool[];
  viewMode: 'grid' | 'list';
  isLoading?: boolean;
  onToolClick?: (tool: Tool) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  viewMode,
  isLoading = false,
  onToolClick = () => {}
}) => {
  if (isLoading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ToolCardSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
          <Grid className="w-16 h-16 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No tools found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search criteria or filters to find more AI tools
        </p>
        <Button variant="outline">
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {tools.map((tool, index) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          viewMode={viewMode}
          index={index}
          onClick={() => onToolClick(tool)}
        />
      ))}
    </div>
  );
};

const ToolCard: React.FC<{
  tool: Tool;
  viewMode: 'grid' | 'list';
  index: number;
  onClick: () => void;
}> = ({ tool, viewMode, index, onClick }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        delay: index * 0.1 
      }
    }
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'freemium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'paid': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getPricingText = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'Free';
      case 'freemium': return 'Freemium';
      case 'paid': return 'Paid';
      default: return pricing;
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01 }}
        className="cursor-pointer"
        onClick={onClick}
      >
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* 工具图标 */}
              <div className="flex-shrink-0">
                <OptimizedImage
                  src={tool.image}
                  alt={tool.title}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>

              {/* 工具信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold truncate">{tool.title}</h3>
                    {tool.featured && (
                      <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <Badge className={getPricingColor(tool.pricing)}>
                    {getPricingText(tool.pricing)}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{tool.stats}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>

                {/* 标签 */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tool.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, y: -5 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="hover:shadow-xl transition-all duration-300 h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 mb-2">
            <OptimizedImage
              src={tool.image}
              alt={tool.title}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg truncate">{tool.title}</CardTitle>
                {tool.featured && (
                  <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                )}
              </div>
              <Badge className={getPricingColor(tool.pricing) + " text-xs"}>
                {getPricingText(tool.pricing)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription className="mb-4 line-clamp-3">
            {tool.description}
          </CardDescription>

          {/* 标签 */}
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex gap-1 mb-4 flex-wrap">
              {tool.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tool.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{tool.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* 统计信息 */}
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{tool.stats}</span>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex-1">
              <Heart className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-1" />
              Visit
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ToolCardSkeleton: React.FC<{ viewMode: 'grid' | 'list' }> = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolGrid; 