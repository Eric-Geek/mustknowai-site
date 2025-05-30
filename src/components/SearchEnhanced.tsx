import React, { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import Fuse from 'fuse.js';
import { Search, X, Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';

interface SearchProps {
  data: any[];
  searchKeys: string[];
  onResults: (results: any[]) => void;
  placeholder?: string;
  className?: string;
}

export const SearchEnhanced: React.FC<SearchProps> = ({ 
  data, 
  searchKeys, 
  onResults,
  placeholder = "Search AI tools...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const { searchHistory, addSearchHistory, clearSearchHistory } = useStore();

  const fuse = useMemo(() => new Fuse(data, {
    keys: searchKeys,
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2
  }), [data, searchKeys]);

  const handleSearch = useCallback(
    debounce((searchQuery: string) => {
      setIsSearching(true);
      
      if (!searchQuery.trim()) {
        onResults(data);
        setSuggestions([]);
        setIsSearching(false);
        return;
      }
      
      const results = fuse.search(searchQuery);
      const filteredResults = results.map(r => r.item);
      onResults(filteredResults);
      
      // 生成搜索建议
      const uniqueTerms = new Set<string>();
      results.slice(0, 5).forEach(result => {
        searchKeys.forEach(key => {
          const value = result.item[key];
          if (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) {
            uniqueTerms.add(value);
          }
        });
      });
      setSuggestions(Array.from(uniqueTerms).slice(0, 5));
      setIsSearching(false);
    }, 300),
    [data, fuse, onResults, searchKeys]
  );

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(value.length > 0);
    handleSearch(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    addSearchHistory(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearchHistory(query.trim());
      setShowSuggestions(false);
    }
  };

  const clearInput = () => {
    setQuery('');
    onResults(data);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="search"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowSuggestions(query.length > 0 || searchHistory.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent"
          />
          {query && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* 搜索建议和历史 */}
      {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {/* 搜索建议 */}
          {suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                Search Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center space-x-2"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* 搜索历史 */}
          {searchHistory.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span>Search History</span>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-brand-purple hover:text-brand-purple/80"
                >
                  Clear
                </button>
              </div>
              {searchHistory.slice(0, 5).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center space-x-2"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 搜索状态指示器 */}
      {isSearching && (
        <div className="absolute top-full mt-1 left-0 text-sm text-gray-500 dark:text-gray-400">
          Searching...
        </div>
      )}
    </div>
  );
}; 