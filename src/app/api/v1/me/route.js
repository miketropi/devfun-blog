import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    // Check if the authorization header exists and is a Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    // Call the WordPress API to get the current user
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp/v2/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // If the WordPress API returns an error, pass it along
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || 'Failed to fetch user data' },
        { status: response.status }
      );
    }
    
    // Get the user data from the response
    const userData = await response.json();
    
    // Return the user data
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}