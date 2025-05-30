import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const passwordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordValues = z.infer<typeof passwordSchema>;

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    // 检查URL中是否包含访问令牌
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    if (!params.get('access_token')) {
      toast({
        title: 'Error',
        description: 'Invalid or missing reset token',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [navigate, toast]);

  const onSubmit = async (values: PasswordValues) => {
    try {
      setIsLoading(true);
      setMessage(null);

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your password has been updated successfully',
      });
      setMessage('Password updated successfully. Redirecting to home page...');
      
      // 延迟跳转到首页
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 p-6 bg-card border rounded-lg shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          {message ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-md text-center">
              {message}
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword; 