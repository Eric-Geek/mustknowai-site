import { lazy } from 'react';

// 使用动态导入进行路由级代码分割
export const routes = [
  {
    path: '/',
    component: lazy(() => import('@/pages/Index')),
    title: 'MustKnowAI - AI Tools Directory',
    description: 'Discover the best AI tools for your needs'
  },
  {
    path: '/discover',
    component: lazy(() => import('@/pages/Discover')),
    title: 'Discover AI Tools - MustKnowAI',
    description: 'Browse and search through thousands of AI tools'
  },
  {
    path: '/tool/:toolId',
    component: lazy(() => import('@/pages/ToolDetail')),
    title: 'Tool Details - MustKnowAI',
    description: 'Detailed information about AI tools'
  },
  {
    path: '/submit',
    component: lazy(() => import('@/pages/Submit')),
    title: 'Submit AI Tool - MustKnowAI',
    description: 'Submit your AI tool to our directory'
  },
  {
    path: '/pricing',
    component: lazy(() => import('@/pages/Pricing')),
    title: 'Pricing - MustKnowAI',
    description: 'Choose the right plan for your needs'
  },
  {
    path: '*',
    component: lazy(() => import('@/pages/NotFound')),
    title: 'Page Not Found - MustKnowAI',
    description: 'The page you are looking for does not exist'
  }
];

export type RouteConfig = typeof routes[0]; 