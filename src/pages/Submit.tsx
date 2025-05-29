import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Upload, Star, Zap, Globe } from 'lucide-react';

const categories = [
  'Chatbot', 'Writing', 'Design & Art', 'Music', 'Voice', 'Video', 
  'Picture', 'Office', 'Free', 'Game', 'Shopping', 'Fashion', 'GPTs'
];

const pricingTypes = ['Free', 'Freemium', 'Paid', 'One-time Purchase'];

const Submit = () => {
  const [formData, setFormData] = useState({
    toolName: '',
    description: '',
    website: '',
    category: '',
    pricingType: '',
    shortDescription: '',
    features: '',
    contactEmail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Submission Successful!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for submitting your AI tool! Our team will review your submission within 1-3 business days.
              Once approved, your tool will appear in the MustKnowAI directory.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                📧 We'll notify you of the review results via email
              </p>
              <p className="text-sm text-muted-foreground">
                ⭐ High-quality tools will receive featured homepage placement
              </p>
            </div>
            <Button 
              onClick={() => window.location.href = '/'}
              className="mt-8"
            >
              Back to Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Submit Your <span className="text-brand-purple">AI Tool</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join the MustKnowAI community and let global users discover your AI tool. Free submission, fast review, and gain more exposure opportunities!
          </p>
          
          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-purple">10M+</div>
              <div className="text-sm text-muted-foreground">Monthly Visits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-purple">5000+</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-purple">100+</div>
              <div className="text-sm text-muted-foreground">New Tools/Month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Submit Your Tool to MustKnowAI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Global Exposure</CardTitle>
                <CardDescription>
                  Over 10 million monthly visits - let your tool be discovered by users worldwide
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Premium Featuring</CardTitle>
                <CardDescription>
                  High-quality tools receive homepage featuring and special showcases
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Fast Review</CardTitle>
                <CardDescription>
                  1-3 business days quick review process to get online and gain traffic fast
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Submit AI Tool Information</CardTitle>
              <CardDescription>
                Please fill out the following information, and we'll review your submission as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="toolName">Tool Name *</Label>
                    <Input
                      id="toolName"
                      value={formData.toolName}
                      onChange={(e) => handleInputChange('toolName', e.target.value)}
                      placeholder="e.g., ChatGPT"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Official Website *</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="Describe your AI tool in one sentence (50 characters max)"
                    maxLength={50}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    {formData.shortDescription.length}/50 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Provide detailed information about your AI tool's features, capabilities, and use cases..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Tool Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Pricing Type *</Label>
                    <Select 
                      value={formData.pricingType} 
                      onValueChange={(value) => handleInputChange('pricingType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select pricing type" />
                      </SelectTrigger>
                      <SelectContent>
                        {pricingTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Key Features</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    placeholder="List 3-5 main features and capabilities..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    For receiving review result notifications
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Upload className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit AI Tool
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    By submitting, you agree to our{' '}
                    <a href="/terms" className="text-brand-purple hover:underline">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-brand-purple hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Submit; 