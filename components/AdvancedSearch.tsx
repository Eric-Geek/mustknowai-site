"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  Star,
  TrendingUp,
  Clock,
  Users
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"

interface AdvancedSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  categories: string[]
  availableTags: string[]
  sortBy: string
  onSortChange: (sort: string) => void
  resultsCount: number
}

const sortOptions = [
  { value: "relevance", label: "Most Relevant", icon: TrendingUp },
  { value: "rating", label: "Highest Rated", icon: Star },
  { value: "newest", label: "Newest", icon: Clock },
  { value: "popular", label: "Most Popular", icon: Users }
]

export default function AdvancedSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  categories,
  availableTags,
  sortBy,
  onSortChange,
  resultsCount
}: AdvancedSearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [tempTags, setTempTags] = useState<string[]>(selectedTags)

  const handleTagToggle = useCallback((tag: string) => {
    setTempTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  const applyFilters = useCallback(() => {
    onTagsChange(tempTags)
    setIsFilterOpen(false)
  }, [tempTags, onTagsChange])

  const clearFilters = useCallback(() => {
    onSearchChange("")
    onCategoryChange("All Categories")
    onTagsChange([])
    setTempTags([])
    onSortChange("relevance")
  }, [onSearchChange, onCategoryChange, onTagsChange, onSortChange])

  const removeTag = useCallback((tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag)
    onTagsChange(newTags)
    setTempTags(newTags)
  }, [selectedTags, onTagsChange])

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <Card className="p-6 bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search AI tools, features, or use cases..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl bg-white dark:bg-gray-800 transition-all duration-300"
            />
          </div>

          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="min-w-[200px] justify-between border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 transition-all duration-300"
              >
                <span className="truncate">{selectedCategory}</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-xl border-0 shadow-xl bg-white dark:bg-gray-800">
              <DropdownMenuLabel className="text-gray-500 dark:text-gray-400">Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`cursor-pointer rounded-lg mx-2 my-1 ${
                    selectedCategory === category 
                      ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400" 
                      : ""
                  }`}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Advanced Filter Button */}
          <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className={`border-2 rounded-xl px-4 py-3 transition-all duration-300 ${
                  selectedTags.length > 0 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400" 
                    : "border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800"
                }`}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {selectedTags.length > 0 && (
                  <Badge className="ml-2 bg-blue-500 text-white">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4 rounded-xl border-0 shadow-xl bg-white dark:bg-gray-800">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Filter by Tags</h4>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tempTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 ${
                          tempTags.includes(tag)
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Button onClick={applyFilters} size="sm" className="flex-1">
                    Apply Filters
                  </Button>
                  <Button 
                    onClick={() => setTempTags([])} 
                    variant="outline" 
                    size="sm"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="min-w-[160px] justify-between border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl px-4 py-3 bg-white dark:bg-gray-800 transition-all duration-300"
              >
                <span className="truncate">
                  {sortOptions.find(opt => opt.value === sortBy)?.label || "Sort by"}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-xl border-0 shadow-xl bg-white dark:bg-gray-800">
              <DropdownMenuLabel className="text-gray-500 dark:text-gray-400">Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`cursor-pointer rounded-lg mx-2 my-1 ${
                      sortBy === option.value 
                        ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400" 
                        : ""
                    }`}
                  >
                    <IconComponent className="mr-2 h-4 w-4" />
                    {option.label}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {/* Active Filters & Results */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Results Count */}
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            {resultsCount} tools found
          </span>

          {/* Active Tags */}
          {selectedTags.length > 0 && (
            <>
              <span className="text-gray-400">•</span>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 cursor-pointer transition-colors"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Clear All Filters */}
        {(searchQuery || selectedCategory !== "All Categories" || selectedTags.length > 0) && (
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="mr-1 h-4 w-4" />
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  )
} 