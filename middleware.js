import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the request is for the protected route
  if (request.nextUrl.pathname === '/protected') {
    const authState = request.cookies.get('auth_state');
    
    // If there's no valid auth state, redirect to the playground
    if (!authState || authState.value !== 'validated') {
      return NextResponse.redirect(new URL('/playground', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/protected'
}; 