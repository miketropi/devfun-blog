import { NextResponse } from 'next/server';

// Define which routes require authentication
const protectedRoutes = [
  '/api/v1/user',
  // Add other protected routes here
];

// Define which routes are public
const publicRoutes = [
  '/api/v1/login',
  '/api/v1/register',
  // Add other public routes here
];

export function middleware(request) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If it's not a protected route, allow the request to proceed
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Get the authorization header
  const authHeader = request.headers.get('authorization');
  
  // Check if the authorization header exists and is a Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  // Extract the token
  const token = authHeader.split(' ')[1];
  
  // In a real app, you would verify the token here
  // For this example, we'll just check if it exists
  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Invalid token' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  // If the token exists, allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run only on API routes
export const config = {
  matcher: '/api/:path*',
};