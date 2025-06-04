import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, password } = body;
    
    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    const login_endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + 'jwt-auth/v1/token';
    const response = await fetch(login_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      return NextResponse.json( 
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Extract the token and user from the response
    const res = await response.json();
    const { token, refresh_token, ...user } = res;

    // Set the token as a cookie
    const cookieStore = cookies()
    cookieStore.set('token', token, { 
      httpOnly: true, 
      maxAge: 60 * 2, // 2 minutes
    });

    cookieStore.set('refreshToken', refresh_token, { 
      httpOnly: true, 
      maxAge: 60 * 60 * 24 * 30 // 30 days 
    })
    
    // Return the user and token
    return NextResponse.json({ 
      token,
      user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}