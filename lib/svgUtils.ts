/**
 * SVG 优化和处理工具函数
 */

export interface SVGOptimizationOptions {
  removeComments?: boolean;
  removeMetadata?: boolean;
  removeUnusedNS?: boolean;
  cleanupAttrs?: boolean;
  minifyStyles?: boolean;
  convertColors?: boolean;
}

/**
 * 基础 SVG 清理函数
 */
export function cleanSVG(svgString: string, options: SVGOptimizationOptions = {}): string {
  let cleaned = svgString;

  const {
    removeComments = true,
    removeMetadata = true,
    removeUnusedNS = true,
    cleanupAttrs = true,
    minifyStyles = true,
    convertColors = true,
  } = options;

  if (removeComments) {
    // 移除 XML 注释
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  }

  if (removeMetadata) {
    // 移除 metadata 标签
    cleaned = cleaned.replace(/<metadata[\s\S]*?<\/metadata>/gi, '');
    // 移除 title 和 desc 标签（如果不需要的话）
    cleaned = cleaned.replace(/<title[\s\S]*?<\/title>/gi, '');
    cleaned = cleaned.replace(/<desc[\s\S]*?<\/desc>/gi, '');
  }

  if (cleanupAttrs) {
    // 清理多余的空格
    cleaned = cleaned.replace(/\s+/g, ' ');
    // 移除空属性
    cleaned = cleaned.replace(/\s*=\s*""\s*/g, '');
  }

  if (convertColors) {
    // 将长颜色代码转换为短代码
    cleaned = cleaned.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3');
  }

  return cleaned.trim();
}

/**
 * 检查 SVG 是否有效
 */
export function isValidSVG(svgString: string): boolean {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const parserError = doc.querySelector('parsererror');
    return !parserError && doc.documentElement.tagName.toLowerCase() === 'svg';
  } catch {
    return false;
  }
}

/**
 * 从 SVG 字符串中提取尺寸信息
 */
export function getSVGDimensions(svgString: string): { width?: number; height?: number; viewBox?: string } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = doc.documentElement;

  const width = svgElement.getAttribute('width');
  const height = svgElement.getAttribute('height');
  const viewBox = svgElement.getAttribute('viewBox');

  return {
    width: width ? parseFloat(width) : undefined,
    height: height ? parseFloat(height) : undefined,
    viewBox: viewBox || undefined,
  };
}

/**
 * 为 SVG 添加响应式属性
 */
export function makeResponsiveSVG(svgString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = doc.documentElement;

  // 如果没有 viewBox，尝试从 width 和 height 创建
  if (!svgElement.getAttribute('viewBox')) {
    const width = svgElement.getAttribute('width');
    const height = svgElement.getAttribute('height');
    if (width && height) {
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  }

  // 移除固定的 width 和 height，使其响应式
  svgElement.removeAttribute('width');
  svgElement.removeAttribute('height');

  // 添加响应式样式
  svgElement.setAttribute('style', 'width: 100%; height: 100%;');

  return new XMLSerializer().serializeToString(svgElement);
}

/**
 * 创建 SVG 数据 URL
 */
export function createSVGDataURL(svgString: string): string {
  const cleanedSVG = cleanSVG(svgString);
  const encoded = encodeURIComponent(cleanedSVG);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * 预加载 SVG 图标
 */
export async function preloadSVG(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const svgText = await response.text();
    
    if (isValidSVG(svgText)) {
      return svgText;
    } else {
      console.warn(`Invalid SVG at ${url}`);
      return null;
    }
  } catch (error) {
    console.error(`Failed to preload SVG from ${url}:`, error);
    return null;
  }
}

/**
 * 批量预加载 SVG 图标
 */
export async function preloadSVGs(urls: string[]): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  
  const promises = urls.map(async (url) => {
    const svgContent = await preloadSVG(url);
    if (svgContent) {
      results.set(url, svgContent);
    }
  });

  await Promise.allSettled(promises);
  return results;
}

/**
 * SVG 缓存管理器
 */
class SVGCache {
  private cache = new Map<string, string>();
  private maxSize = 50; // 最大缓存数量

  set(key: string, value: string): void {
    if (this.cache.size >= this.maxSize) {
      // 删除最旧的条目
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key: string): string | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const svgCache = new SVGCache(); 