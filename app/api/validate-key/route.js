import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();
    
    // Query Supabase for the API key
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .maybeSingle(); // Using maybeSingle() instead of single() to avoid the error
    
    // If we found a matching API key, it's valid
    const isValid = !!data;
    
    if (isValid) {
      // Store the validation state in a cookie
      cookies().set('auth_state', 'validated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 // 1 hour
      });
    }
    
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ valid: false });
  }
} 