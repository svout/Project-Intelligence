'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Button from '@/components/elements/Button';
import { Input } from '@/components/elements/Input';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const supabase = createClient();

      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          setMessage(
            'Account created! Please check your email to verify your account.'
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        router.push('/dashboard');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-left">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-bg-secondary border border-border-subtle text-[12px] font-semibold">
              PI
            </span>
            <span className="text-[13px] font-medium text-text-secondary">Project Intelligence</span>
          </Link>
          <h1 className="text-h1 text-text-primary mb-1">
            {isSignUp ? 'Create your workspace' : 'Sign in'}
          </h1>
          <p className="text-body text-text-secondary">
            {isSignUp
              ? 'Start analyzing meetings, tasks and risks with AI.'
              : 'Use your email and password to access your dashboards.'}
          </p>
        </div>

        <div className="card-base">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <Input
                label="Full name"
                placeholder="Alex Johnson"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
            )}

            <Input
              type="email"
              label="Work email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              minLength={6}
              required
              hint={isSignUp ? 'Must be at least 6 characters.' : undefined}
            />

            {error && (
              <div className="rounded-lg border border-semantic-danger/40 bg-semantic-danger/5 px-3 py-2 text-small text-semantic-danger">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-lg border border-semantic-success/40 bg-semantic-success/5 px-3 py-2 text-small text-semantic-success">
                {message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
            >
              {isSignUp ? 'Continue' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-between text-small text-text-secondary">
            <span>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setMessage('');
              }}
              className="text-text-primary hover:text-text-secondary underline-offset-4 hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Create account'}
            </button>
          </div>
        </div>

        <p className="mt-6 text-tiny text-text-muted text-left">
          By continuing, you agree to the Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
