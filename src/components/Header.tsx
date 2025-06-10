import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Heart, 
  Settings, 
  LogOut,
  Bell,
  Plus,
  Search,
  LayoutDashboard,
  Package,
  Star,
  Crown
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

// 模拟的用户认证Hook（您需要根据实际情况替换）
const useAuth = () => {
  // 这里应该连接到您的认证系统
  return {
    isAuthenticated: true,
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: null, // 或者用户头像URL
      plan: 'professional' // 'free' | 'professional' | 'enterprise'
    }
  };
};

// 订阅计划标识组件
const SubscriptionBadge: React.FC<{ plan: string }> = ({ plan }) => {
  const planConfig = {
    free: {
      style: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      icon: null
    },
    professional: {
      style: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      icon: <Star className="w-3 h-3 mr-1" />
    },
    enterprise: {
      style: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      icon: <Crown className="w-3 h-3 mr-1" />
    }
  };

  const config = planConfig[plan] || planConfig.free;

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
      config.style
    )}>
      {config.icon}
      {plan.charAt(0).toUpperCase() + plan.slice(1)}
    </span>
  );
};

// 通知图标组件
const NotificationBell: React.FC = () => {
  const [hasUnread, setHasUnread] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        {hasUnread && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
          >
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Notifications</h3>
              <div className="space-y-2">
                <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <p className="text-sm text-gray-700 dark:text-gray-300">Your submitted tool "AI Writer Pro" has been approved!</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                </div>
                <div className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer">
                  <p className="text-sm text-gray-700 dark:text-gray-300">New feature: Advanced search filters are now available</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 用户菜单组件
const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // 处理登出逻辑
    console.log('Logging out...');
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Heart, label: 'My Favorites', href: '/favorites' },
    { icon: Package, label: 'Submitted Tools', href: '/my-tools' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {/* 用户头像 */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-white font-medium text-sm">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        
        {/* 用户名（桌面端显示） */}
        <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
          {user.name}
        </span>
        
        {/* 下拉箭头 */}
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-500 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* 下拉菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          >
            {/* 用户信息头部 */}
            <div className="py-3 px-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
                <SubscriptionBadge plan={user.plan} />
              </div>
            </div>
            
            {/* 菜单项 */}
            <nav className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              
              {/* 升级提示（仅免费用户显示） */}
              {user.plan === 'free' && (
                <>
                  <hr className="my-2 dark:border-gray-700" />
                  <Link
                    to="/pricing"
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Star className="w-4 h-4" />
                    Upgrade to Pro
                  </Link>
                </>
              )}
              
              <hr className="my-2 dark:border-gray-700" />
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 w-full text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 主Header组件
export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Explore', href: '/explore' },
    { label: 'Categories', href: '/categories' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Submit', href: '/submit' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MustKnowAI
              </span>
            </Link>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* 快捷操作（桌面端） */}
                <div className="hidden md:flex items-center gap-2 mr-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/submit')}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Submit Tool</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/search')}
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                {/* 通知 */}
                <NotificationBell />

                {/* 主题切换 */}
                <ThemeToggle />

                {/* 用户菜单 */}
                <UserMenu />
              </>
            ) : (
              <>
                {/* 主题切换 */}
                <ThemeToggle />

                {/* 登录/注册按钮 */}
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/signup')}>
                    Sign Up
                  </Button>
                </div>
              </>
            )}

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {!isAuthenticated && (
                <>
                  <hr className="dark:border-gray-700" />
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
              
              {isAuthenticated && (
                <>
                  <hr className="dark:border-gray-700" />
                  <div className="px-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {user.name}
                        </span>
                      </div>
                      <SubscriptionBadge plan={user.plan} />
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Favorites
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      // 处理登出
                    }}
                  >
                    Sign Out
                  </button>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;