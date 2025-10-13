import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/signin?error=auth_error', requestUrl.origin));
    }

    // Log successful authentication (both sign in and sign up)
    if (data?.user) {
      console.log('User authenticated successfully:', {
        id: data.user.id,
        email: data.user.email,
        isNewUser: data.user.created_at === data.user.last_sign_in_at
      });
    }
  }

  // Redirect to dashboard or specified next URL after authentication
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}

