import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const WritingIcon: React.FC<IconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="currentColor" className="text-blue-500"/>
    <path d="M20 16h24c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H20c-2.2 0-4-1.8-4-4V20c0-2.2 1.8-4 4-4z" fill="white"/>
    <path d="M22 24h20M22 30h20M22 36h16M22 42h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-500"/>
    <circle cx="46" cy="18" r="6" fill="currentColor" className="text-amber-500"/>
    <path d="M43 18l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="currentColor" className="text-emerald-500"/>
    <rect x="12" y="16" width="40" height="32" rx="4" fill="white"/>
    <circle cx="22" cy="26" r="4" fill="currentColor" className="text-emerald-500"/>
    <path d="M12 40l8-8 6 6 8-8 14 14v4c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4v-8z" fill="currentColor" className="text-emerald-500"/>
    <circle cx="46" cy="18" r="6" fill="currentColor" className="text-amber-500"/>
    <path d="M43 18l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const VideoIcon: React.FC<IconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="currentColor" className="text-violet-500"/>
    <rect x="12" y="18" width="32" height="28" rx="4" fill="white"/>
    <path d="M44 24l8-4v24l-8-4v-16z" fill="white"/>
    <path d="M24 28l8 4-8 4v-8z" fill="currentColor" className="text-violet-500"/>
    <circle cx="46" cy="14" r="6" fill="currentColor" className="text-amber-500"/>
    <path d="M43 14l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="currentColor" className="text-red-500"/>
    <rect x="12" y="16" width="40" height="32" rx="4" fill="white"/>
    <path d="M20 26l-4 4 4 4M28 26l4 4-4 4M32 24l-4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"/>
    <circle cx="46" cy="14" r="6" fill="currentColor" className="text-amber-500"/>
    <path d="M43 14l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 图标映射对象，便于动态使用
export const CategoryIconMap = {
  Writing: WritingIcon,
  Image: ImageIcon,
  Video: VideoIcon,
  Code: CodeIcon,
} as const;

export type CategoryType = keyof typeof CategoryIconMap; 