import React from 'react';
import { Github, Link as LinkIcon, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerData = {
    solution: [
      { label: 'Submit AI', href: '/submit' },
      { label: 'Pricing', href: '/pricing' }
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' }
    ],
    legal: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' }
    ],
    recommended: [
      { label: 'ChatGPT', href: 'https://chat.openai.com', external: true },
      { label: 'Midjourney', href: 'https://midjourney.com', external: true },
      { label: 'Claude', href: 'https://claude.ai', external: true }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  const languages = [
    { label: 'English', code: 'en' },
    { label: '中文', code: 'zh' },
    { label: 'Deutsch', code: 'de' },
    { label: '日本語', code: 'ja' },
    { label: 'Français', code: 'fr' }
  ];

  const FooterSection = ({ title, links }) => (
    <div>
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map(({ label, href, external }) => (
          <li key={label}>
            <a 
              href={href} 
              className="text-muted-foreground hover:text-brand-purple transition-colors flex items-center"
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {label}
              {external && <LinkIcon className="w-3 h-3 ml-1" />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer 
      className="bg-card border-t border-border py-16 px-4"
      role="contentinfo"
      aria-label="Site footer"
    >
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
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="p-2 bg-accent rounded-lg hover:bg-brand-purple hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterSection title="Solution" links={footerData.solution} />
          <FooterSection title="Links" links={footerData.links} />
          
          <div>
            <FooterSection title="Legal" links={footerData.legal} />
            <div className="mt-6">
              <FooterSection title="Recommended" links={footerData.recommended} />
            </div>
          </div>
        </div>

        {/* Language selector */}
        <div className="border-t border-border pt-8 mb-8">
          <nav aria-label="Language selection" className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {languages.map(({ label, code }) => (
              <a 
                key={code}
                href={`?lang=${code}`}
                lang={code}
                className="hover:text-brand-purple transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="text-center text-muted-foreground text-sm">
          © {currentYear} MustKnowAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
