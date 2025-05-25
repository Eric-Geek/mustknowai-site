import { useEffect } from 'react';

interface SVGPreloaderProps {
  icons: string[];
}

export const SVGPreloader: React.FC<SVGPreloaderProps> = ({ icons }) => {
  useEffect(() => {
    // 预加载 SVG 图标
    const preloadSVGs = async () => {
      const promises = icons.map(async (iconPath) => {
        try {
          const response = await fetch(iconPath);
          if (response.ok) {
            const svgText = await response.text();
            // 创建一个隐藏的 div 来缓存 SVG
            const div = document.createElement('div');
            div.style.display = 'none';
            div.innerHTML = svgText;
            document.body.appendChild(div);
            
            // 清理：几秒后移除缓存的 SVG
            setTimeout(() => {
              if (div.parentNode) {
                div.parentNode.removeChild(div);
              }
            }, 5000);
          }
        } catch (error) {
          console.warn(`Failed to preload SVG: ${iconPath}`, error);
        }
      });
      
      await Promise.allSettled(promises);
    };

    // 延迟预加载，避免阻塞关键渲染路径
    const timeoutId = setTimeout(preloadSVGs, 100);
    
    return () => clearTimeout(timeoutId);
  }, [icons]);

  return null; // 这个组件不渲染任何内容
};

export default SVGPreloader; 