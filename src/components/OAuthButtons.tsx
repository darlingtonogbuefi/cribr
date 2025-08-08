//  src\components\OAuthButtons.tsx


// src/components/OAuthButtons.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

export function OAuthButtons() {
  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'facebook') => {
    const redirectHost = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL!;
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${redirectHost}/auth/callback`,
      },
    });

    if (error) {
      console.error(`OAuth login error with ${provider}:`, error.message);
    }
  };

  return (
    <div className="space-y-2 pt-4">
      <button
        onClick={() => handleOAuthSignIn('google')}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-[#202124] text-white hover:bg-[#3c4043] py-2 px-4 text-sm font-medium transition"
      >
        <FaGoogle className="h-4 w-4" />
        Continue with Google
      </button>

      <button
        onClick={() => handleOAuthSignIn('github')}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-[#171515] text-white hover:bg-[#2c2c2c] py-2 px-4 text-sm font-medium transition"
      >
        <FaGithub className="h-4 w-4" />
        Continue with GitHub
      </button>

      <button
        onClick={() => handleOAuthSignIn('facebook')}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-[#1877F2] text-white hover:bg-[#166fe5] py-2 px-4 text-sm font-medium transition"
      >
        <FaFacebook className="h-4 w-4" />
        Continue with Facebook
      </button>
    </div>
  );
}
