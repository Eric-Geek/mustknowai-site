import React from 'react';

interface ToolIconProps {
  className?: string;
  size?: number;
}

export const ChatGPTIcon: React.FC<ToolIconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#10A37F"/>
    <path d="M32 12c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z" fill="white"/>
    <path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#10A37F"/>
    <circle cx="32" cy="32" r="4" fill="#10A37F"/>
  </svg>
);

export const MidjourneyIcon: React.FC<ToolIconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#000"/>
    <path d="M16 48V16h8l8 16 8-16h8v32h-8V28l-8 16-8-16v20h-8z" fill="white"/>
  </svg>
);

export const GitHubCopilotIcon: React.FC<ToolIconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#24292e"/>
    <path d="M32 12c-11.046 0-20 8.954-20 20 0 8.837 5.74 16.33 13.708 18.976.998.184 1.364-.434 1.364-.966 0-.476-.018-1.74-.027-3.416-5.565 1.21-6.74-2.682-6.74-2.682-.91-2.31-2.22-2.924-2.22-2.924-1.816-1.24.138-1.216.138-1.216 2.008.142 3.064 2.062 3.064 2.062 1.784 3.056 4.68 2.174 5.822 1.664.18-1.294.698-2.174 1.27-2.674-4.44-.504-9.11-2.22-9.11-9.882 0-2.184.78-3.968 2.062-5.366-.206-.504-.894-2.536.196-5.286 0 0 1.68-.538 5.5 2.05a19.12 19.12 0 0 1 5-.674c1.696.008 3.406.23 5 .674 3.818-2.588 5.498-2.05 5.498-2.05 1.092 2.75.404 4.782.198 5.286 1.284 1.398 2.06 3.182 2.06 5.366 0 7.682-4.676 9.372-9.13 9.864.718.618 1.358 1.838 1.358 3.704 0 2.674-.024 4.83-.024 5.486 0 .536.36 1.158 1.374.962C50.26 48.326 56 40.836 56 32c0-11.046-8.954-20-20-20z" fill="white"/>
  </svg>
);

export const ClaudeIcon: React.FC<ToolIconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#CC785C"/>
    <path d="M32 12c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20z" fill="white"/>
    <path d="M24 24h16v4H24v-4zm0 8h16v4H24v-4zm0 8h12v4H24v-4z" fill="#CC785C"/>
  </svg>
);

export const NotionIcon: React.FC<ToolIconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#000"/>
    <path d="M16 16h32v32H16V16z" fill="white"/>
    <path d="M20 20v24h4V28l8 16h4V20h-4v16l-8-16h-4z" fill="#000"/>
  </svg>
);

export const RunwayIcon: React.FC<ToolIconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#000"/>
    <path d="M16 20h32v8H16v-8zm0 16h32v8H16v-8z" fill="white"/>
    <circle cx="32" cy="32" r="4" fill="#000"/>
  </svg>
);

export const PerplexityIcon: React.FC<ToolIconProps> = ({ className = "", size = 64 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 64 64" 
    fill="none"
    width={size}
    height={size}
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#20B2AA"/>
    <path d="M32 12l16 20-16 20-16-20 16-20z" fill="white"/>
    <path d="M32 20l8 12-8 12-8-12 8-12z" fill="#20B2AA"/>
  </svg>
);

// 工具图标映射
export const ToolIconMap = {
  'ChatGPT': ChatGPTIcon,
  'Midjourney': MidjourneyIcon,
  'GitHub Copilot': GitHubCopilotIcon,
  'Claude AI': ClaudeIcon,
  'Notion AI': NotionIcon,
  'RunwayML': RunwayIcon,
  'Perplexity AI': PerplexityIcon,
} as const;

export type ToolType = keyof typeof ToolIconMap; 