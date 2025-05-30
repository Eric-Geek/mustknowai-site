import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
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
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  category,
  image,
  isNew = false,
  promoCode,
  stats,
  size = 'medium'
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

  const CardContent = () => (
    <div className={`bg-card rounded-xl border border-border hover-lift cursor-pointer group relative overflow-hidden ${cardClasses[size]}`}>
      {/* New badge */}
      {isNew && (
        <div className="absolute top-3 right-3 bg-brand-purple text-white text-xs px-2 py-1 rounded-full z-10">
          New
        </div>
      )}

      {/* Image */}
      <div className={`${imageClasses[size]} mb-4 rounded-lg overflow-hidden bg-muted`}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Category badge */}
        <div className="inline-block">
          <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md font-medium">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground group-hover:text-brand-purple transition-colors">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Stats */}
          {stats && (
          <p className="text-xs text-muted-foreground">
              {stats}
          </p>
          )}

        {/* Promo code */}
        {promoCode && (
          <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-md p-2 text-center">
            <span className="text-brand-purple text-xs font-medium">
              Code: {promoCode}
            </span>
          </div>
        )}

        {/* Action button */}
        <div className="pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full group-hover:bg-brand-purple group-hover:text-white group-hover:border-brand-purple transition-all"
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            {hasDetail ? 'View Details' : 'Visit Tool'}
          </Button>
      </div>
      </div>
    </div>
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
