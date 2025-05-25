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
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
        setIsComplete(true);
        
        // 启动间歇性故障效果
        const glitchInterval = setInterval(() => {
          setShowGlitch(true);
          setTimeout(() => setShowGlitch(false), 150);
        }, 3000 + Math.random() * 2000);

        return () => clearInterval(glitchInterval);
      }
    }, 100);

    return () => clearInterval(typewriterInterval);
  }, [text]);

  return (
    <div className={`relative ${className}`} style={style}>
      {/* 主文字 */}
      <h1 
        className="font-bold tracking-tight select-none transition-all duration-500 text-center text-white"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textShadow: '0 0 20px rgba(96, 165, 250, 0.5), 0 0 40px rgba(96, 165, 250, 0.3)',
          ...(isComplete && {
            background: 'linear-gradient(-45deg, #60a5fa, #a855f7, #ec4899, #60a5fa)',
            backgroundSize: '400% 400%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            animation: 'gradient-flow 3s ease infinite'
          })
        }}
      >
        {displayText}
        {!isComplete && (
          <span className="animate-pulse text-blue-400 ml-1">|</span>
        )}
      </h1>

      {/* 故障效果层 */}
      {showGlitch && isComplete && (
        <>
          <h1 
            className="absolute top-0 left-0 w-full font-bold tracking-tight select-none text-center pointer-events-none"
            style={{
              color: '#ff0066',
              transform: 'translate(-2px, 0)',
              opacity: 0.6,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'inherit'
            }}
          >
            {displayText}
          </h1>
          <h1 
            className="absolute top-0 left-0 w-full font-bold tracking-tight select-none text-center pointer-events-none"
            style={{
              color: '#00ffff',
              transform: 'translate(2px, 0)',
              opacity: 0.6,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'inherit'
            }}
          >
            {displayText}
          </h1>
        </>
      )}

      <style jsx>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
