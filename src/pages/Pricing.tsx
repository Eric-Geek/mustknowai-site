import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Users, 
  Shield,
  Clock,
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Free",
      description: "Perfect for individuals and AI enthusiasts",
      price: isAnnual ? "0" : "0",
      originalPrice: null,
      period: isAnnual ? "/year" : "/month",
      popular: false,
      features: [
        "Browse all AI tools",
        "Basic search functionality",
        "Tool category filtering",
        "Daily tool recommendations",
        "Community reviews access",
        "Basic tool comparison (up to 3 tools)"
      ],
      limitations: [
        "Advertisement display",
        "Limited features",
        "No priority support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      description: "Perfect for professionals and small teams",
      price: isAnnual ? "99" : "12",
      originalPrice: isAnnual ? "144" : null,
      period: isAnnual ? "/year" : "/month",
      popular: true,
      features: [
        "Ad-free browsing experience",
        "Advanced search and filtering",
        "Unlimited tool comparisons",
        "Tool bookmarks",
        "Early access to new tools",
        "Detailed tool analysis reports",
        "Email tool recommendations",
        "Priority customer support",
        "Exclusive member badge"
      ],
      limitations: [],
      buttonText: "Subscribe Now",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      description: "Perfect for large teams and enterprises",
      price: isAnnual ? "299" : "29",
      originalPrice: isAnnual ? "348" : null,
      period: isAnnual ? "/year" : "/month",
      popular: false,
      features: [
        "All Professional features",
        "Team collaboration tools",
        "Custom tool directory",
        "API access",
        "White-label customization",
        "Dedicated account manager",
        "Training and consulting services",
        "Data export functionality",
        "SLA guarantee"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "default" as const
    }
  ];

  const features = [
    {
      category: "Basic Features",
      items: [
        { name: "AI tool browsing", free: true, pro: true, enterprise: true },
        { name: "Basic search", free: true, pro: true, enterprise: true },
        { name: "Tool categories", free: true, pro: true, enterprise: true },
        { name: "Daily recommendations", free: true, pro: true, enterprise: true }
      ]
    },
    {
      category: "Advanced Features",
      items: [
        { name: "Ad-free experience", free: false, pro: true, enterprise: true },
        { name: "Advanced search", free: false, pro: true, enterprise: true },
        { name: "Unlimited comparisons", free: false, pro: true, enterprise: true },
        { name: "Tool bookmarks", free: false, pro: true, enterprise: true },
        { name: "Early access to new tools", free: false, pro: true, enterprise: true }
      ]
    },
    {
      category: "Enterprise Features",
      items: [
        { name: "Team collaboration", free: false, pro: false, enterprise: true },
        { name: "API access", free: false, pro: false, enterprise: true },
        { name: "White-label customization", free: false, pro: false, enterprise: true },
        { name: "Dedicated account manager", free: false, pro: false, enterprise: true }
      ]
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time in your account settings. After cancellation, you can still use paid features until the end of your current billing cycle."
    },
    {
      question: "What's the difference between monthly and annual billing?",
      answer: "Annual billing offers approximately 17% discount compared to monthly billing. All features are the same, only the billing cycle differs."
    },
    {
      question: "How many users are included in the Enterprise plan?",
      answer: "Enterprise plan supports unlimited users. You can purchase one Enterprise account for your entire team or company."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 7-day unconditional money-back guarantee. If you're not satisfied within 7 days of purchase, you can request a full refund."
    },
    {
      question: "Do I need technical knowledge to use the API?",
      answer: "The API is primarily designed for developers and technical teams. We provide detailed documentation and technical support to help you integrate quickly."
    },
    {
      question: "What's the difference between Professional and Enterprise customer support?",
      answer: "Professional users enjoy priority email support, typically with responses within 24 hours. Enterprise users have dedicated account managers with phone and live chat support."
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose the Perfect <span className="text-brand-purple">Pricing Plan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              From individual users to enterprise teams, we have the right plan for every need.
              Join over 100,000 users on their AI tool discovery journey!
            </p>

            {/* Monthly/Annual Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 ${!isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                  isAnnual ? 'bg-brand-purple' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                    isAnnual ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`ml-3 ${isAnnual ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge variant="secondary" className="ml-3 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Save 17%
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className={`relative h-full ${
                    plan.popular 
                      ? 'border-brand-purple shadow-xl scale-105' 
                      : 'border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-brand-purple text-white px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-foreground">
                          ${plan.price}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          {plan.period}
                        </span>
                      </div>
                      {plan.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          Originally ${plan.originalPrice}{plan.period}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Button 
                      className="w-full mb-6" 
                      variant={plan.buttonVariant}
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">Included Features:</h4>
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.length > 0 && (
                        <div className="pt-4 border-t">
                          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Limitations:</h4>
                          {plan.limitations.map((limitation, limitIndex) => (
                            <div key={limitIndex} className="flex items-start">
                              <span className="w-4 h-4 text-red-400 mt-0.5 mr-3 flex-shrink-0">×</span>
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Detailed Feature Comparison
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Feature</th>
                        <th className="text-center p-4 font-semibold">Free</th>
                        <th className="text-center p-4 font-semibold">Professional</th>
                        <th className="text-center p-4 font-semibold">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {features.map((category, categoryIndex) => (
                        <React.Fragment key={categoryIndex}>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <td colSpan={4} className="p-4 font-semibold text-sm">
                              {category.category}
                            </td>
                          </tr>
                          {category.items.map((item, itemIndex) => (
                            <tr key={itemIndex} className="border-b">
                              <td className="p-4">{item.name}</td>
                              <td className="text-center p-4">
                                {item.free ? (
                                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                                ) : (
                                  <span className="text-red-400">×</span>
                                )}
                              </td>
                              <td className="text-center p-4">
                                {item.pro ? (
                                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                                ) : (
                                  <span className="text-red-400">×</span>
                                )}
                              </td>
                              <td className="text-center p-4">
                                {item.enterprise ? (
                                  <Check className="w-4 h-4 text-green-500 mx-auto" />
                                ) : (
                                  <span className="text-red-400">×</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "John Smith",
                role: "Product Manager",
                avatar: "👨‍💼",
                content: "The Professional plan's tool comparison feature is incredibly useful. It helped me quickly find the best AI tools for our team.",
                rating: 5
              },
              {
                name: "Sarah Johnson",
                role: "Independent Developer",
                avatar: "👩‍💻",
                content: "The ad-free browsing experience allows me to focus on tool research, and the early access feature is fantastic!",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Startup Founder",
                avatar: "👨‍🚀",
                content: "Enterprise plan's API access helped us quickly build our internal tool directory. The customer support is also very professional.",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{review.avatar}</div>
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{review.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Start Your AI Tool Discovery Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us to discover the most suitable AI tools for you and boost your productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing; 