import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// 动态导入组件以避免 SSR 问题
const Hyperspeed = dynamic(() => import('@/components/Hyperspeed'), { ssr: false });
const SplashCursor = dynamic(() => import('@/components/SplashCursor'), { ssr: false });
const AnimatedText = dynamic(() => import('@/components/AnimatedText'), { ssr: false });

export default function LandingPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/home');
  };

  return (
    <>
      <Head>
        <title>MustKnowAI</title>
        <meta name="description" content="MustKnowAI - 发现最佳 AI 工具" />
        <meta property="og:title" content="MustKnowAI" />
        <meta property="og:description" content="MustKnowAI - 发现最佳 AI 工具" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="relative min-h-screen overflow-hidden cursor-pointer" onClick={handleClick}>
        {/* Hyperspeed 背景 */}
        <Hyperspeed speed={1.5} effectOpacity={0.9} starCount={1000} />
        
                 {/* SplashCursor 动画 */}
         <SplashCursor size={40} color="#60a5fa" trailLength={50} />

                 {/* 主标题 - 居中显示 */}
         <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
           <AnimatedText 
             text="MustKnowAI"
             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
           />
         </div>

        {/* 隐藏的提示文字 - 只在悬停时显示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white/60 text-sm">
          点击进入
        </div>
      </div>
    </>
  );
}
