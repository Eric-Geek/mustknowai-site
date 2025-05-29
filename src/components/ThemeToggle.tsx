import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark' | 'system';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // 获取系统主题偏好
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // 应用主题到DOM
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // 移除所有主题类
    root.classList.remove('light', 'dark');
    
    if (newTheme === 'system') {
      const systemTheme = getSystemTheme();
      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    } else {
      root.classList.add(newTheme);
    }
    
    // 设置color-scheme属性以确保浏览器原生控件也跟随主题
    const effectiveTheme = newTheme === 'system' ? getSystemTheme() : newTheme;
    root.style.colorScheme = effectiveTheme;
    
    // 触发自定义事件，通知其他组件主题已变化
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: newTheme, effectiveTheme } 
    }));
  };

  // 从localStorage读取主题设置
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (savedTheme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 切换到下一个主题
  const toggleTheme = () => {
    const themeOrder: Theme[] = ['system', 'light', 'dark'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];
    
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  // 获取当前实际显示的主题（考虑系统主题）
  const getCurrentDisplayTheme = (): 'light' | 'dark' => {
    if (theme === 'system') {
      return getSystemTheme();
    }
    return theme;
  };

  // 获取主题信息
  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return { icon: Sun, label: '浅色模式' };
      case 'dark':
        return { icon: Moon, label: '深色模式' };
      case 'system':
        return { icon: Settings, label: '跟随系统' };
      default:
        return { icon: Settings, label: '跟随系统' };
    }
  };

  if (!mounted) {
    return null;
  }

  const { icon: CurrentIcon, label } = getThemeInfo();
  const isCurrentDark = getCurrentDisplayTheme() === 'dark';

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="h-9 w-9 p-0"
        title={`当前: ${label} (点击切换)`}
      >
        <motion.div
          animate={{ 
            rotate: theme === 'system' ? (isCurrentDark ? 360 : 0) : (isCurrentDark ? 180 : 0)
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {theme === 'system' ? (
            <Settings className="h-4 w-4" />
          ) : theme === 'light' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.div>
        <span className="sr-only">切换主题: {label}</span>
      </Button>
    </motion.div>
  );
};

export default ThemeToggle; 