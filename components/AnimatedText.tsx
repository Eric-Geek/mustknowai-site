'use client';
import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({ text, className = '', style = {} }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        setIsComplete(true);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, [text]);

  return (
    <div className={`relative ${className}`} style={style}>
      {/* 主文字 */}
      <h1 
        className="font-bold tracking-tight select-none transition-all duration-500 text-center relative z-10"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          ...(isComplete ? {
            background: 'linear-gradient(-45deg, #60a5fa, #a855f7, #ec4899, #f59e0b, #10b981, #06b6d4, #60a5fa)',
            backgroundSize: '400% 400%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            animation: 'rainbow-flow-slow 6s ease infinite, gentle-breathe 4s ease-in-out infinite',
            textShadow: 'none'
          } : {
            color: 'white',
            textShadow: '0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(96, 165, 250, 0.3)'
          })
        }}
      >
        {displayText}
        {!isComplete && (
          <span className="animate-pulse text-blue-400 ml-1">|</span>
        )}
      </h1>



      <style jsx>{`
        @keyframes rainbow-flow-slow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes gentle-breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        /* 添加发光效果 */
        h1 {
          position: relative;
        }
        
        h1::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          background-clip: inherit;
          -webkit-background-clip: inherit;
          filter: blur(15px);
          opacity: 0.4;
          z-index: -1;
          animation: inherit;
        }
        
        h1::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: inherit;
          background-clip: inherit;
          -webkit-background-clip: inherit;
          filter: blur(30px);
          opacity: 0.2;
          z-index: -2;
          animation: inherit;
        }
      `}</style>
    </div>
  );
}
