'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-background to-muted px-4">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 mb-8">
        <Image
          src="/logo.svg"
          alt="Docify Logo"
          width={48}
          height={48}
          className="rounded-xl shadow-lg"
        />
        <span className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          docify
        </span>
      </div>

      {/* Error Card */}
      <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        {/* Error Title */}
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Something went wrong
        </h1>

        {/* Error Description */}
        <p className="text-muted-foreground mb-6">
          We encountered an unexpected error while processing your request.
          Don&apos;t worry, your documents are safe.
        </p>

        {/* Error Digest (for debugging) */}
        {error.digest && (
          <div className="bg-muted rounded-lg px-4 py-2 mb-6">
            <p className="text-xs text-muted-foreground font-mono">
              Error ID: {error.digest}
            </p>
            <p className='text-xs text-foreground p-2'>{error.message}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="gap-2" variant="default">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer Help Text */}
      <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Image
          src="/logo.svg"
          alt="Docify"
          width={16}
          height={16}
          className="opacity-50"
        />
        <span>
          Need help?{' '}
          <Link
            href="/support"
            className="text-primary hover:underline font-medium"
          >
            Contact support
          </Link>
        </span>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-destructive/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
