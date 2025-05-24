import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locales, locale: currentLocale, pathname, asPath } = router;

  const changeLanguage = async (newLocale: string) => {
    try {
      // 构建新的路径
      const url = pathname;
      await router.push(url, url, { locale: newLocale });
    } catch (error) {
      console.error('语言切换失败:', error);
      // 备用方案：直接跳转到对应语言的首页
      window.location.href = newLocale === 'zh' ? '/' : `/${newLocale}`;
    }
  };

  // 如果没有配置多语言或只有一种语言，不显示切换器
  if (!locales || locales.length <= 1) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="切换语言 / Change language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLanguage(locale)}
            disabled={currentLocale === locale}
            aria-current={currentLocale === locale ? "page" : undefined}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            <span className="flex items-center gap-2">
              {locale === 'en' ? '🇺🇸 English' : '🇨🇳 中文'}
              {currentLocale === locale && <span className="text-xs">(当前)</span>}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 