import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get refresh token from request body
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json(
        { message: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Call WordPress refresh token endpoint
    const response = await fetch(`${ process.env.NEXT_PUBLIC_API_ENDPOINT }jwt-auth/v1/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to refresh token' },
        { status: response.status }
      );
    }

    const { token, ...user } = data;

    // Return new tokens
    return NextResponse.json({
      token,
      user
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
