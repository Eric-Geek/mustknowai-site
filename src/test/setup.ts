import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
(global as any).ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
(global as any).IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock performance API
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => []),
  },
});

// Mock PerformanceObserver
(global as any).PerformanceObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestIdleCallback
(global as any).requestIdleCallback = vi.fn((callback: any) => {
  return setTimeout(callback, 0) as any;
});

(global as any).cancelIdleCallback = vi.fn((id: any) => {
  clearTimeout(id);
});

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000/api',
    NODE_ENV: 'test',
  },
}));

// Mock zustand
vi.mock('zustand', () => ({
  create: vi.fn((createFn) => {
    const store = createFn(() => ({}), () => ({}));
    return () => store;
  }),
}));

// Global test utilities
export const createMockTool = (overrides = {}) => ({
  id: 'test-tool',
  title: 'Test Tool',
  description: 'A test tool description',
  category: 'Test',
  image: '/test-image.webp',
  stats: '1K+ users',
  link: '/tool/test-tool',
  featured: false,
  pricing: 'free' as const,
  tags: ['test', 'ai'],
  ...overrides,
});

export const createMockApiResponse = <T>(data: T, overrides = {}) => ({
  data,
  success: true,
  message: 'Success',
  ...overrides,
}); 