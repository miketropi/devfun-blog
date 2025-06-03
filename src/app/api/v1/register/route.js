import { NextResponse } from 'next/server';

// Mock user database - in a real app, this would be a database query
// This is the same mock database used in the login route
let users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    // In a real app, this would be a hashed password
    password: 'password123',
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

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, email, password } = body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }
    
    // Create a new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password, // In a real app, this would be hashed
      name: username, // Default name to username
      role: 'subscriber' // Default role
    };
    
    // Add the user to our mock database
    // In a real app, this would be a database insert
    users.push(newUser);
    
    // Create a sanitized user object (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Return the created user
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}