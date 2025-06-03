import React, { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SectionSkeleton } from "@/components/LazySection";
import { routes } from "@/router/routes";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 10 * 60 * 1000, // 10分钟 (previously cacheTime)
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

// 页面级loading组件
const PageLoader = () => (
  <div className="min-h-screen bg-background">
    <SectionSkeleton height="h-16" className="rounded-none mb-4" />
    <div className="container mx-auto px-4">
      <SectionSkeleton height="h-96" className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SectionSkeleton key={i} height="h-64" />
        ))}
      </div>
    </div>
  </div>
);

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
          <ErrorBoundary>
            <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
          <Routes>
                    {routes.map((route, index) => {
                      const Component = route.component;
                      return (
                        <Route
                          key={index}
                          path={route.path}
                          element={
                            <ErrorBoundary>
                              <Component />
                            </ErrorBoundary>
                          }
                        />
                      );
                    })}
          </Routes>
                </Suspense>
        </BrowserRouter>
            </AuthProvider>
          </ErrorBoundary>
      </TooltipProvider>
    </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
