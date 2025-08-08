//   src\app\auth\callback\page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirect = async () => {
      // Supabase SDK parses the URL automatically after redirect
      // Just get the current session:
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        setStatus('error');
        setErrorMessage(error?.message ?? 'Authentication failed. Please try again.');
        return;
      }

      setStatus('success');

      // Clean URL by removing auth query params
      window.history.replaceState({}, document.title, '/dashboard');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    };

    handleRedirect();

    // Listen for auth state changes to react if session changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setStatus('success');
        window.history.replaceState({}, document.title, '/dashboard');

        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setStatus('error');
        setErrorMessage('Authentication failed or session expired. Please sign in again.');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      {status === 'checking' && <p>Checking session...</p>}
      {status === 'success' && <p>Successfully signed in! Redirecting...</p>}
      {status === 'error' && (
        <>
          <p className="text-red-600">{errorMessage}</p>
          <button
            className="mt-4 underline text-blue-600"
            onClick={() => router.push('/sign-in')}
          >
            Back to Sign In
          </button>
        </>
      )}
    </main>
  );
}
