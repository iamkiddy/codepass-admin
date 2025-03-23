'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { forgotPassword } from '@/lib/actions/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await forgotPassword({ email });
      
      toast.success('Password reset instructions sent to your email!', {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
        },
      });

      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage, {
        duration: 3000,
        position: 'top-center',
        style: {
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Event Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          alt="Event background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we&apos;ll send you instructions to reset your password.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full bg-primaryColor hover:bg-indigo-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => router.push('/signin')}
                disabled={isLoading}
              >
                Back to Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
