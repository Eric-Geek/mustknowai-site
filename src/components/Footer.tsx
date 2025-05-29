
import React from 'react';
import { Github, Link as LinkIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-16 px-4">
      <div className="container mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-foreground">MustKnowAI</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Discover thousands of AI tools to make AI work for you.
            </p>
            <p className="text-muted-foreground mb-6">
              Contact: <a href="mailto:hi@mustknowai.com" className="text-brand-purple hover:underline">hi@mustknowai.com</a>
            </p>
            
            {/* Social icons */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-accent rounded-lg hover:bg-brand-purple hover:text-white transition-colors">
                <div className="w-5 h-5 bg-current rounded-sm"></div>
              </a>
              <a href="#" className="p-2 bg-accent rounded-lg hover:bg-brand-purple hover:text-white transition-colors">
                <div className="w-5 h-5 bg-current rounded-full"></div>
              </a>
              <a href="#" className="p-2 bg-accent rounded-lg hover:bg-brand-purple hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-accent rounded-lg hover:bg-brand-purple hover:text-white transition-colors">
                <div className="w-5 h-5 bg-current"></div>
              </a>
            </div>
          </div>

          {/* Solution */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solution</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Submit AI</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">About</a></li>
            </ul>
          </div>

          {/* Legal & Recommended */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Terms</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">Privacy Policy</a></li>
            </ul>
            
            <h3 className="font-semibold text-foreground mb-4">Recommended</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors flex items-center">
                  ChatGPT <LinkIcon className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors flex items-center">
                  Midjourney <LinkIcon className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors flex items-center">
                  Claude <LinkIcon className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Language selector */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-brand-purple transition-colors">English</a>
            <a href="#" className="hover:text-brand-purple transition-colors">中文</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Deutsch</a>
            <a href="#" className="hover:text-brand-purple transition-colors">日本語</a>
            <a href="#" className="hover:text-brand-purple transition-colors">Français</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground text-sm">
          © 2025 MustKnowAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
