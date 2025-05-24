import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  // 暂时简化为静态组件，因为项目未配置 i18n
  return (
    <Button variant="ghost" size="icon" aria-label="Language" disabled>
      <Globe className="h-5 w-5" />
    </Button>
  );
} 