import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                404
              </h1>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
                size="lg"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
              
              <Button 
                onClick={() => window.history.back()}
                variant="outline"
                className="flex items-center gap-2"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <Card className="max-w-lg mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What can you do?
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Search for AI tools in our directory
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Explore popular AI tools on our homepage
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Need help? Contact us at{' '}
                    <a 
                      href="mailto:support@mustknowai.com" 
                      className="text-brand-purple hover:underline"
                    >
                      support@mustknowai.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
