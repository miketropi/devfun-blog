import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Mock user database - in a real app, this would be a database query
const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123', // In a real app, this would be hashed
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    password: 'password123',
    name: 'Regular User',
    role: 'subscriber'
  }
];

// Verify token and get user
function getUserFromToken(token) {
  try {
    // In a real app, you would verify the JWT signature
    // This is a simplified token verification - DO NOT use in production
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    const user = users.find(u => u.id === payload.id);
    return user || null;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

// GET - Get current user profile
export async function GET(request) {
  try {
    // Get the authorization header
    const headersList = headers();
    const authorization = headersList.get('authorization');
    
    // Check if token exists
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authorization.split(' ')[1];
    
    // Verify token and get user
    const user = getUserFromToken(token);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update user profile
export async function PATCH(request) {
  try {
    // Get the authorization header
    const headersList = headers();
    const authorization = headersList.get('authorization');
    
    // Check if token exists
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authorization.split(' ')[1];
    
    // Verify token and get user
    const user = getUserFromToken(token);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await request.json();
    const { name, email } = body;
    
    // Update user data
    // In a real app, this would be a database update
    if (name) user.name = name;
    if (email) user.email = email;
    
    // Return updated user data without password
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      message: 'User updated successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}