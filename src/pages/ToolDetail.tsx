import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Eye, 
  Tag, 
  Star, 
  Share2, 
  Heart,
  Users,
  Globe,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Tool data interface
interface ToolData {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  website: string;
  addedDate: string;
  monthlyVisits: string;
  isFree: boolean;
  rating: number;
  introduction: string;
  whatIs: string;
  coreFeatures: Array<{
    title: string;
    description: string;
  }>;
  usageCases: Array<{
    title: string;
    description: string;
  }>;
  howToUse: string;
  audience: string[];
  pricing: {
    isFree: boolean;
    description: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  tags: string[];
  alternatives: Array<{
    name: string;
    description: string;
    category: string;
    visits: string;
  }>;
}

// Sample tool data - in a real app, this would come from an API or database
const toolsData: { [key: string]: ToolData } = {
  'globalgpt': {
    id: 'globalgpt',
    name: 'GlobalGPT',
    description: 'Pay Once, Access All Top AI Models & Agents in one platform',
    category: 'Platform',
    image: '/globalgpt-screenshot.png',
    website: 'https://www.glbgpt.com',
    addedDate: '1/20/2024',
    monthlyVisits: '2.5M',
    isFree: false,
    rating: 4.9,
    introduction: 'GlobalGPT is the ultimate AI aggregation platform offering one-time payment access to all premium AI models and agents.',
    whatIs: 'GlobalGPT is a revolutionary AI aggregation platform that provides users with unified access to the world\'s most powerful AI models and agents. With the tagline "Pay Once, Access All Top AI Models & Agents," GlobalGPT eliminates the need for multiple subscriptions by offering a single platform where users can access Claude Sonnet 4, Claude Opus 4, GPT-4o, Midjourney V7, Runway, Grok 3 Beta, Llama 4, and many other cutting-edge AI tools. This comprehensive platform democratizes access to premium AI technology.',
    coreFeatures: [
      {
        title: 'Unified AI Access',
        description: 'Access Claude, GPT-4o, Midjourney, Runway, and 20+ premium AI models from a single dashboard.'
      },
      {
        title: 'One-Time Payment Model',
        description: 'Pay once and gain lifetime access to all premium AI models without recurring subscription fees.'
      },
      {
        title: 'Latest AI Models',
        description: 'Get access to the newest releases like Claude Sonnet 4, Midjourney V7, and Grok 3 Beta as soon as they\'re available.'
      }
    ],
    usageCases: [
      {
        title: 'Content Creation',
        description: 'Use multiple AI models for writing, image generation, and video creation in one streamlined workflow.'
      },
      {
        title: 'AI Development & Research',
        description: 'Compare and test different AI models for optimal performance in your specific use cases.'
      },
      {
        title: 'Business Automation',
        description: 'Leverage various AI agents and models to automate different aspects of your business operations.'
      }
    ],
    howToUse: 'To use GlobalGPT, visit glbgpt.com and sign up for an account. Choose your preferred payment plan to unlock access to all available AI models. Navigate through the intuitive interface to select and use different AI models like Claude, GPT-4o, Midjourney, and more from a single dashboard.',
    audience: ['AI Enthusiasts', 'Content Creators', 'Developers and Researchers', 'Digital Marketers', 'Business Professionals', 'Entrepreneurs'],
    pricing: {
      isFree: false,
      description: 'GlobalGPT operates on a unique "Pay Once, Access All" model. Instead of multiple monthly subscriptions, users can purchase lifetime access to all premium AI models and agents through various pricing tiers designed for different usage levels.'
    },
    faq: [
      {
        question: 'Which AI models are available on GlobalGPT?',
        answer: 'GlobalGPT provides access to 20+ premium AI models including Claude Sonnet 4, Claude Opus 4, GPT-4o, Midjourney V7, Runway, Grok 3 Beta, Llama 4, AI Detector, and many more.'
      },
      {
        question: 'How does the "Pay Once" model work?',
        answer: 'Instead of paying multiple monthly subscriptions, you make a one-time payment to GlobalGPT and gain access to all available premium AI models and future releases.'
      },
      {
        question: 'Are new AI models automatically included?',
        answer: 'Yes, GlobalGPT continuously adds new AI models and agents to the platform, and existing users get access to these updates as part of their membership.'
      }
    ],
    tags: ['AI Aggregation', 'Multiple AI Models', 'One-Time Payment', 'Claude', 'GPT-4o', 'Midjourney', 'AI Platform', 'Premium AI Access'],
    alternatives: [
      {
        name: 'ChatGPT Plus',
        description: 'OpenAI\'s premium subscription for GPT-4 access',
        category: 'Chatbot',
        visits: '1.8B'
      },
      {
        name: 'Claude Pro',
        description: 'Anthropic\'s premium Claude subscription service',
        category: 'Chatbot',
        visits: '50M'
      },
      {
        name: 'Midjourney',
        description: 'Premium AI image generation subscription service',
        category: 'Design & Art',
        visits: '89M'
      }
    ]
  },
  'chatgpt': {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Advanced AI chatbot for conversations and assistance',
    category: 'Chatbot',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    website: 'https://chat.openai.com',
    addedDate: '2/15/2024',
    monthlyVisits: '1.8B',
    isFree: true,
    rating: 4.8,
    introduction: 'ChatGPT is a leading AI conversational platform offering advanced natural language processing capabilities.',
    whatIs: 'ChatGPT, developed by OpenAI, is an advanced language model that can engage in human-like conversations, answer questions, assist with writing, coding, analysis, and creative tasks. Built on the GPT architecture, it represents one of the most sophisticated AI assistants available to the public.',
    coreFeatures: [
      {
        title: 'Natural Language Understanding',
        description: 'ChatGPT excels at understanding context and nuance in human language, enabling natural conversations.'
      },
      {
        title: 'Multi-task Capability',
        description: 'From writing and coding to analysis and creative tasks, ChatGPT handles diverse challenges effectively.'
      },
      {
        title: 'Continuous Learning',
        description: 'The model is regularly updated with new capabilities and improved performance based on user feedback.'
      }
    ],
    usageCases: [
      {
        title: 'Content Creation',
        description: 'Generate articles, blogs, marketing copy, and creative writing with AI assistance.'
      },
      {
        title: 'Code Development',
        description: 'Get help with programming, debugging, and learning new coding languages.'
      },
      {
        title: 'Research and Analysis',
        description: 'Analyze data, summarize documents, and conduct research on various topics.'
      }
    ],
    howToUse: 'To use ChatGPT, simply visit the OpenAI website, create an account, and start chatting. You can ask questions, request help with tasks, or engage in conversations. ChatGPT Plus subscribers get access to GPT-4 and additional features.',
    audience: ['Developers and Programmers', 'Content Creators and Writers', 'Students and Educators', 'Business Professionals', 'Researchers'],
    pricing: {
      isFree: true,
      description: 'ChatGPT offers free access with GPT-3.5. ChatGPT Plus ($20/month) provides access to GPT-4, faster response times, and priority access during peak hours.'
    },
    faq: [
      {
        question: 'Is ChatGPT free to use?',
        answer: 'Yes, ChatGPT offers free access with GPT-3.5. However, ChatGPT Plus subscription provides additional benefits.'
      },
      {
        question: 'What is the difference between GPT-3.5 and GPT-4?',
        answer: 'GPT-4 is more advanced with better reasoning, longer context understanding, and improved accuracy compared to GPT-3.5.'
      },
      {
        question: 'Can I use ChatGPT for commercial purposes?',
        answer: 'Yes, you can use ChatGPT for commercial purposes, but review OpenAI\'s usage policies for specific guidelines.'
      }
    ],
    tags: ['AI Assistant', 'Natural Language Processing', 'Conversational AI', 'Writing Assistant', 'Code Helper'],
    alternatives: [
      {
        name: 'Claude',
        description: 'Anthropic\'s AI assistant focused on helpful, harmless, and honest interactions',
        category: 'Chatbot',
        visits: '50M'
      },
      {
        name: 'Bard',
        description: 'Google\'s conversational AI service powered by LaMDA',
        category: 'Chatbot',
        visits: '142M'
      },
      {
        name: 'Perplexity AI',
        description: 'AI-powered search engine that provides sourced answers',
        category: 'Search',
        visits: '89M'
      }
    ]
  },
  'midjourney': {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI art generator creating stunning visual content',
    category: 'Design & Art',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
    website: 'https://midjourney.com',
    addedDate: '3/10/2024',
    monthlyVisits: '89M',
    isFree: false,
    rating: 4.7,
    introduction: 'Midjourney is a leading AI image generation platform that creates stunning artwork from text descriptions.',
    whatIs: 'Midjourney is an independent research lab that has created an AI program capable of generating images from textual descriptions. It operates through Discord and has become one of the most popular AI art generation tools, known for its high-quality, artistic outputs.',
    coreFeatures: [
      {
        title: 'High-Quality Art Generation',
        description: 'Creates detailed, artistic images with exceptional quality and style consistency.'
      },
      {
        title: 'Style Versatility',
        description: 'Supports various artistic styles from photorealistic to abstract and fantasy art.'
      },
      {
        title: 'Community Features',
        description: 'Discord-based platform allows users to see others\' creations and collaborate.'
      }
    ],
    usageCases: [
      {
        title: 'Digital Art Creation',
        description: 'Generate unique artwork for personal projects, portfolios, and creative endeavors.'
      },
      {
        title: 'Marketing Materials',
        description: 'Create compelling visuals for advertising, social media, and brand campaigns.'
      },
      {
        title: 'Concept Design',
        description: 'Develop visual concepts for games, films, and other creative projects.'
      }
    ],
    howToUse: 'To use Midjourney, join their Discord server, subscribe to a plan, and use the /imagine command followed by your text description. The AI will generate images based on your prompt.',
    audience: ['Digital Artists', 'Graphic Designers', 'Content Creators', 'Marketing Professionals', 'Game Developers'],
    pricing: {
      isFree: false,
      description: 'Midjourney offers subscription plans starting at $10/month for basic access, with higher tiers providing more generation hours and commercial usage rights.'
    },
    faq: [
      {
        question: 'Do I own the images generated by Midjourney?',
        answer: 'Subscribers have usage rights to images they generate, with commercial rights available on paid plans.'
      },
      {
        question: 'How does Midjourney compare to other AI art generators?',
        answer: 'Midjourney is known for its artistic quality and style, often producing more visually appealing results than competitors.'
      },
      {
        question: 'Can I use Midjourney images commercially?',
        answer: 'Yes, paid subscribers can use generated images for commercial purposes according to their plan terms.'
      }
    ],
    tags: ['AI Art', 'Image Generation', 'Digital Art', 'Creative Tools', 'Discord Bot'],
    alternatives: [
      {
        name: 'DALL-E 3',
        description: 'OpenAI\'s advanced image generation model with high accuracy',
        category: 'Design & Art',
        visits: '45M'
      },
      {
        name: 'Stable Diffusion',
        description: 'Open-source image generation model with customizable features',
        category: 'Design & Art',
        visits: '78M'
      },
      {
        name: 'Adobe Firefly',
        description: 'Adobe\'s AI image generator integrated with Creative Suite',
        category: 'Design & Art',
        visits: '34M'
      }
    ]
  }
};

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const [tool, setTool] = useState<ToolData | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (toolId && toolsData[toolId]) {
      setTool(toolsData[toolId]);
    }
  }, [toolId]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested tool could not be found.</p>
          <Link to="/discover">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <Link to="/discover" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>

          {/* Tool Header */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-2/3">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-20 h-20 rounded-xl object-cover border border-border"
                />
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {tool.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    {tool.introduction}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Add on: {tool.addedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      Monthly Visits: {tool.monthlyVisits}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <Badge variant="secondary">{tool.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => window.open(tool.website, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit {tool.name}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{tool.rating}/5</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Free Access</span>
                      <Badge variant={tool.isFree ? 'default' : 'secondary'}>
                        {tool.isFree ? 'Yes' : 'Paid'}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Monthly Visits</span>
                      <span className="font-semibold">{tool.monthlyVisits}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-12">
          {/* What is Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">What is {tool.name}?</h2>
            <p className="text-muted-foreground leading-relaxed">{tool.whatIs}</p>
          </motion.div>

          {/* Core Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{tool.name}'s Core Features</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tool.coreFeatures.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Usage Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{tool.name}'s Usage Cases</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tool.usageCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      {useCase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* How to Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">How to use {tool.name}?</h2>
            <p className="text-muted-foreground leading-relaxed">{tool.howToUse}</p>
          </motion.div>

          {/* Target Audience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{tool.name}'s Audience</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {tool.audience.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Is {tool.name} Free?</h2>
            <p className="text-muted-foreground leading-relaxed">{tool.pricing.description}</p>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{tool.name}'s Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {tool.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">{tool.name}'s Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Alternatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Alternative of {tool.name} in category {tool.category}</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tool.alternatives.map((alt, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{alt.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="outline">{alt.category}</Badge>
                      <span>{alt.visits}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{alt.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolDetail; 