// 直接导入英文翻译
import translations from '@/locales/en/common.json';

export const t = translations;

// 为了保持兼容性，提供一个loadTranslations函数
export async function loadTranslations() {
  return translations;
} 