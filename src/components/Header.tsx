import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown, 
  Settings, 
  Globe, 
  Menu, 
  X,
  UserCircle,
  LogOut,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { Auth } from '@/components/Auth';

const navLinks = [
  { href: "/discover", label: "Discover", description: "Discover AI Tools" },
  { href: "/submit", label: "Submit", description: "Submit Tools" },
  { href: "/pricing", label: "Pricing", description: "Pricing Plans" },
];

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    return window.location.pathname === href;
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b border-gray-200/20 bg-white/80 backdrop-blur-xl dark:border-gray-800/20 dark:bg-gray-950/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30 
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative">
              <motion.div
                className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Settings className="h-4 w-4 text-white" />
              </motion.div>
              <motion.div 
                className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                MustKnowAI
              </span>
              <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                AI Tools Directory
              </div>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`group relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive(link.href)
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                whileHover={{ y: -2 }}
              >
                {link.label}
                <motion.div 
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ originX: 0 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Globe className="h-4 w-4" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login/User Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <UserCircle className="h-4 w-4" />
                      {user.email?.split('@')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsAuthOpen(true)}
              >
                Login
              </Button>
              )}
            </motion.div>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 w-9 p-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
                <span className="sr-only">Open menu</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200/20 bg-white/95 backdrop-blur-xl dark:border-gray-800/20 dark:bg-gray-950/95"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex flex-col space-y-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{link.description}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Footer */}
              <motion.div 
                className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => signOut()}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                      </Button>
                </div>
                ) : (
                <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsAuthOpen(true);
                    }}
                >
                  Login
                </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Dialog */}
      <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </motion.nav>
  );
};

export default Header;
