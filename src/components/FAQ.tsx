
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  {
    question: "What is MustKnowAI?",
    answer: "MustKnowAI is a comprehensive directory and discovery platform for AI tools. We help users find the best AI solutions for their needs, from productivity and creativity to business and entertainment."
  },
  {
    question: "What types of AI tools can I find on MustKnowAI?",
    answer: "You can find a wide variety of AI tools including chatbots, image generators, writing assistants, voice synthesis tools, video editors, design platforms, coding assistants, and much more across various categories."
  },
  {
    question: "How do you select which AI tools to feature?",
    answer: "We carefully evaluate AI tools based on their functionality, user reviews, innovation, ease of use, and overall value. Our team regularly tests and reviews new tools to ensure we feature only the best options."
  },
  {
    question: "Are the AI tools on MustKnowAI free to use?",
    answer: "We feature both free and paid AI tools. Each tool listing clearly indicates its pricing model, whether it's completely free, freemium, or requires a subscription. We also highlight special deals and promo codes when available."
  },
  {
    question: "How can I submit my AI tool to be featured?",
    answer: "You can submit your AI tool through our 'Submit AI' page. We review all submissions and consider tools that meet our quality standards and provide value to our users."
  },
  {
    question: "Do you offer affiliate partnerships?",
    answer: "Yes, we work with AI tool creators and companies through various partnership programs. Contact us at hi@mustknowai.com for more information about collaboration opportunities."
  }
];

const FAQ = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:text-brand-purple">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
