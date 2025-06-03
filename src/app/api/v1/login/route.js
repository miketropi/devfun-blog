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
    const { token, ...user } = await response.json();
    cookies().set('token', token, {
      httpOnly: true,
      // secure: true, 
      sameSite: 'lax', 
      path: '/',
      maxAge: 60 * 15, // 15 minutes
    });
    
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