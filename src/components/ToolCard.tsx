
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

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

  return (
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
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground text-lg group-hover:text-brand-purple transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-accent text-xs font-medium text-accent-foreground">
            {category}
          </span>
          
          {stats && (
            <span className="text-xs text-muted-foreground">
              {stats}
            </span>
          )}
        </div>

        {promoCode && (
          <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-lg p-2 text-center">
            <span className="text-brand-purple text-xs font-medium">
              Promo: {promoCode}
            </span>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      {/* External link icon */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ExternalLink className="w-5 h-5 text-brand-purple" />
      </div>
    </div>
  );
};

export default ToolCard;
