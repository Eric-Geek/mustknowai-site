import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, ChevronDown, Star, Users, Zap, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Categories - matching the main page HeroSection
const categories = [
  'All Tools', 'Free', 'Music', 'Voice', 'Audio', 'Picture', 'Writing', 
  'Office', 'Design & Art', 'Fashion', 'Shopping', 'Video', 'Chatbot',
  'GPTs', 'Game', 'Education', 'Code & IT', 'Marketing', 'Search',
  'Business', 'Analysis', 'SEO', 'Prompt', '3D', 'NSFW', 'Productivity',
  'Lifestyle', 'Life Assistant', 'Translation', 'Travel', 'Career',
  'Food', 'Health', 'Finance', 'News', 'Directory', 'Platform',
  'Open Source', 'Community', 'Research', 'Presentation', 'Privacy',
  'Transcription', 'Sales', 'Sports', 'Entertainment', 'Data Extraction', 'Analytics'
];

// Sample AI Tools Data
const sampleTools = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Advanced AI chatbot for conversations and assistance",
    category: "Chatbot",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    stats: "100M+ users",
    rating: 4.8,
    isFree: true,
    isHot: true
  },
  {
    id: 2,
    name: "Midjourney",
    description: "AI art generator creating stunning visual content",
    category: "Design & Art",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    stats: "15M+ images",
    rating: 4.7,
    isFree: false,
    isHot: true
  },
  {
    id: 3,
    name: "Notion AI",
    description: "AI-powered workspace for notes and collaboration",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    stats: "30M+ users",
    rating: 4.6,
    isFree: true,
    isHot: false
  },
  {
    id: 4,
    name: "ElevenLabs",
    description: "Advanced AI voice synthesis and cloning",
    category: "Voice",
    image: "https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?w=400&h=300&fit=crop",
    stats: "5M+ voices",
    rating: 4.9,
    isFree: false,
    isHot: true
  },
  {
    id: 5,
    name: "Canva AI",
    description: "AI-powered design platform for everyone",
    category: "Design & Art",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    stats: "120M+ designs",
    rating: 4.5,
    isFree: true,
    isHot: false
  },
  {
    id: 6,
    name: "GitHub Copilot",
    description: "AI pair programmer for code completion",
    category: "Code & IT",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe19c7b4e?w=400&h=300&fit=crop",
    stats: "2M+ developers",
    rating: 4.4,
    isFree: false,
    isHot: false
  },
  {
    id: 7,
    name: "Runway ML",
    description: "AI video editing and generation platform",
    category: "Video",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    stats: "8M+ videos",
    rating: 4.6,
    isFree: false,
    isHot: true
  },
  {
    id: 8,
    name: "Jasper AI",
    description: "AI writing assistant for content creation",
    category: "Writing",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    stats: "1M+ articles",
    rating: 4.3,
    isFree: false,
    isHot: false
  }
];

// Generate more sample tools
const generateMoreTools = () => {
  const tools = [];
  for (let i = 9; i <= 50; i++) {
    tools.push({
      id: i,
      name: `AI Tool ${i}`,
      description: `Advanced AI solution for various tasks and workflows ${i}`,
      category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
      image: `https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=400&h=300&fit=crop`,
      stats: `${Math.floor(Math.random() * 100)}K+ users`,
      rating: 4.0 + Math.random() * 1,
      isFree: Math.random() > 0.6,
      isHot: Math.random() > 0.8
    });
  }
  return tools;
};

const allTools = [...sampleTools, ...generateMoreTools()];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTools, setFilteredTools] = useState(allTools);
  const [sortBy, setSortBy] = useState('popular');
  
  const toolsPerPage = 20;

  // Get category from URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    let filtered = allTools;

    // Category filtering
    if (selectedCategory !== 'All Tools') {
      if (selectedCategory === 'Free') {
        filtered = filtered.filter(tool => tool.isFree);
      } else {
        filtered = filtered.filter(tool => tool.category === selectedCategory);
      }
    }

    // Search filtering
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredTools(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
  const currentTools = filteredTools.slice(
    (currentPage - 1) * toolsPerPage,
    currentPage * toolsPerPage
  );

  const ToolCard = ({ tool }: { tool: any }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200/50 dark:border-gray-800/50">
        <div className="relative">
          <img
            src={tool.image}
            alt={tool.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {tool.isFree && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Free
              </Badge>
            )}
            {tool.isHot && (
              <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                🔥 Hot
              </Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 flex gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {tool.name}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{tool.rating.toFixed(1)}</span>
            </div>
          </div>
          <Badge variant="outline" className="w-fit">
            {tool.category}
          </Badge>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {tool.description}
          </CardDescription>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              {tool.stats}
            </div>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
              View Tool
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Discover Best AI Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Explore over 1,796 latest and best AI tools for 2025, let's explore the trends in AI and make AI work for us.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories:</span>
              {categories.slice(0, 10).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-blue-600" : ""}
                >
                  {category}
                </Button>
              ))}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="More..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(10).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="name">By Name</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              Found <span className="font-semibold text-blue-600">{filteredTools.length}</span> AI tools
              {selectedCategory !== 'All Tools' && (
                <span> in <span className="font-semibold">{selectedCategory}</span> category</span>
              )}
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchTerm}-${currentPage}`}
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-blue-600" : ""}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Discover; 