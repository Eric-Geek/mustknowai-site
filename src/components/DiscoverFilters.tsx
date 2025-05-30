import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Star, DollarSign, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface DiscoverFiltersProps {
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

const DiscoverFilters: React.FC<DiscoverFiltersProps> = ({
  onFiltersChange = () => {},
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    pricing: [] as string[],
    rating: [0],
    features: [] as string[],
    integration: [] as string[],
    language: [] as string[]
  });

  const pricingOptions: FilterOption[] = [
    { id: 'free', label: 'Free', count: 1200, icon: <span className="text-green-500">•</span> },
    { id: 'freemium', label: 'Freemium', count: 2800, icon: <span className="text-yellow-500">•</span> },
    { id: 'paid', label: 'Paid', count: 1000, icon: <span className="text-red-500">•</span> },
    { id: 'subscription', label: 'Subscription', count: 800, icon: <span className="text-blue-500">•</span> }
  ];

  const featureOptions: FilterOption[] = [
    { id: 'api', label: 'API Support', count: 450, icon: <Zap className="w-4 h-4" /> },
    { id: 'opensource', label: 'Open Source', count: 280, icon: <Globe className="w-4 h-4" /> },
    { id: 'enterprise', label: 'Enterprise', count: 150, icon: <Shield className="w-4 h-4" /> },
    { id: 'mobile', label: 'Mobile App', count: 320, icon: <span>📱</span> },
    { id: 'offline', label: 'Offline Usage', count: 120, icon: <span>📴</span> },
    { id: 'collaboration', label: 'Team Collaboration', count: 200, icon: <span>👥</span> }
  ];

  const integrationOptions: FilterOption[] = [
    { id: 'slack', label: 'Slack', count: 180 },
    { id: 'discord', label: 'Discord', count: 120 },
    { id: 'zapier', label: 'Zapier', count: 250 },
    { id: 'google', label: 'Google Workspace', count: 300 },
    { id: 'microsoft', label: 'Microsoft 365', count: 220 },
    { id: 'notion', label: 'Notion', count: 150 }
  ];

  const languageOptions: FilterOption[] = [
    { id: 'zh', label: 'Chinese', count: 800 },
    { id: 'en', label: 'English', count: 2500 },
    { id: 'ja', label: 'Japanese', count: 200 },
    { id: 'ko', label: 'Korean', count: 150 },
    { id: 'es', label: 'Spanish', count: 300 },
    { id: 'fr', label: 'French', count: 180 }
  ];

  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCheckboxChange = (filterType: string, optionId: string, checked: boolean) => {
    const currentValues = activeFilters[filterType as keyof typeof activeFilters] as string[];
    const newValues = checked
      ? [...currentValues, optionId]
      : currentValues.filter(id => id !== optionId);
    
    handleFilterChange(filterType, newValues);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      pricing: [],
      rating: [0],
      features: [],
      integration: [],
      language: []
    };
    setActiveFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filters) => {
      if (Array.isArray(filters)) {
        return count + filters.length;
      }
      if (filters[0] > 0) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={`relative ${className}`}>
      {/* 筛选按钮 */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-1">
            {activeFilterCount}
          </Badge>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* 筛选面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-96 bg-background border rounded-lg shadow-lg z-50 p-6"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filter Options</h3>
              <div className="flex gap-2">
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto">
              {/* 价格筛选 */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Pricing
                </h4>
                <div className="space-y-2">
                  {pricingOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`pricing-${option.id}`}
                        checked={activeFilters.pricing.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('pricing', option.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`pricing-${option.id}`}
                        className="flex items-center gap-2 text-sm cursor-pointer flex-1"
                      >
                        {option.icon}
                        <span>{option.label}</span>
                        <span className="text-muted-foreground">({option.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 评分筛选 */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Minimum Rating
                </h4>
                <div className="px-2">
                  <Slider
                    value={activeFilters.rating}
                    onValueChange={(value) => handleFilterChange('rating', value)}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Any</span>
                    <span>{activeFilters.rating[0]}+ stars</span>
                  </div>
                </div>
              </div>

              {/* 功能特性 */}
              <div>
                <h4 className="font-medium mb-3">Features</h4>
                <div className="space-y-2">
                  {featureOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${option.id}`}
                        checked={activeFilters.features.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('features', option.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`feature-${option.id}`}
                        className="flex items-center gap-2 text-sm cursor-pointer flex-1"
                      >
                        {option.icon}
                        <span>{option.label}</span>
                        <span className="text-muted-foreground">({option.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 集成支持 */}
              <div>
                <h4 className="font-medium mb-3">Integrations</h4>
                <div className="grid grid-cols-2 gap-2">
                  {integrationOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`integration-${option.id}`}
                        checked={activeFilters.integration.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('integration', option.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`integration-${option.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {option.label} ({option.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 语言支持 */}
              <div>
                <h4 className="font-medium mb-3">Language Support</h4>
                <div className="grid grid-cols-2 gap-2">
                  {languageOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${option.id}`}
                        checked={activeFilters.language.includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('language', option.id, checked as boolean)
                        }
                      />
                      <label
                        htmlFor={`language-${option.id}`}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {option.label} ({option.count})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 底部操作 */}
            <div className="mt-6 pt-4 border-t flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="flex-1"
              >
                Reset Filters
              </Button>
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverFilters; 