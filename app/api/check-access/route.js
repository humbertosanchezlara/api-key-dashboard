import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const authState = cookieStore.get('auth_state');
    
    // Check if the auth_state cookie exists and is valid
    const isValid = authState?.value === 'validated';
    
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ valid: false });
  }
} 