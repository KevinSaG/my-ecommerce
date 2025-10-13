'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * Component to handle OAuth callbacks that land on the root page
 * This handles cases where the OAuth provider (Google, etc.) redirects to / instead of /auth/callback
 * Works for both Sign In and Sign Up flows with Google OAuth
 */
export default function AuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  useEffect(() => {
    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error, errorDescription);
      router.replace(`/signin?error=${encodeURIComponent(errorDescription || error)}`);
      return;
    }

    // Handle successful OAuth with code
    if (code) {
      // If there's a code parameter, redirect to the auth callback handler
      console.log('OAuth code detected, redirecting to callback handler...');
      router.replace(`/auth/callback?code=${code}`);
    }
  }, [code, error, errorDescription, router]);

  // Show loading while processing OAuth callback
  if (code || error) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-adelca-primary mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            {error ? 'Procesando error...' : 'Completando autenticación...'}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {error ? 'Redirigiendo...' : 'Verificando tu cuenta de Google...'}
          </p>
        </div>
      </div>
    );
  }

  return null;
}
