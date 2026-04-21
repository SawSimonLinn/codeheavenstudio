'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed. Please try again.');
        return;
      }

      const raw = searchParams.get('next') ?? '';
      const next = raw.startsWith('/') && !raw.startsWith('//') && !/^\/[a-zA-Z][a-zA-Z\d+\-.]*:/.test(raw)
        ? raw
        : '/admin';
      router.replace(next);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-admin-bg text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_15%_0%,rgba(0,71,255,0.25),transparent_60%),radial-gradient(700px_500px_at_100%_100%,rgba(0,71,255,0.2),transparent_65%)]" />
      <div className="absolute inset-0 -z-10 opacity-35 [background:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 px-4 py-12 md:grid-cols-2 md:items-center md:gap-10">
        <section className="mb-10 md:mb-0">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-admin-border-bright bg-admin-badge-bg px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-admin-accent-text">
            <Shield className="h-3.5 w-3.5" />
            Secure Access
          </p>
          <h1 className="text-4xl font-black leading-[0.95] tracking-[-0.04em] text-admin-text sm:text-5xl">
            Admin
            <br />
            Control Panel
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-admin-mid-text">
            Manage receipts, activity logs, and finance workflows from one place.
          </p>
        </section>

        <section className="rounded-2xl border border-admin-border-card bg-admin-card/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.png" alt="Code Heaven Studio" className="h-10 w-10 rounded-lg border border-admin-border-bright bg-admin-logo-bg p-1 object-contain" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Sign In</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-admin-dim">Code Heaven Admin</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-admin-label">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="border-admin-border-bright bg-admin-input text-white placeholder:text-admin-placeholder focus-visible:ring-primary focus-visible:ring-offset-admin-card"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-admin-label">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border-admin-border-bright bg-admin-input pr-10 text-white placeholder:text-admin-placeholder focus-visible:ring-primary focus-visible:ring-offset-admin-card"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-admin-icon transition-colors hover:text-admin-icon-hover"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              <Lock className="h-4 w-4" />
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-admin-link transition-colors hover:text-admin-link-hover">
              ← Back to Website
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-admin-bg">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-admin-border-bright border-t-primary" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
