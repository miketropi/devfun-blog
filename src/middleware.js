import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_AUTH_SECRET_KEY;

function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET)
}

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const response = NextResponse.next();

  try {
    if (!token) throw new Error('No token')
    const { payload } = await jwtVerify(token, getSecretKey())
    // console.log('Token payload:', payload) 

    // Token is valid → continue
    return response;
  } catch (err) {
    console.log('Access token invalid or expired:', err.message)
    
    if (!refreshToken) {
      console.log('No refresh token → redirect home page')
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    try {
      const res = await fetch('http://localhost:3000/api/v1/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),  
      })

      if (!res.ok) throw new Error('Refresh failed')
      const data = await res.json()
      const newToken = data?.token
      console.log('Refresh successful')
      
      response.cookies.set('token', newToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 2, // 2 minutes  
      })

      if (data.refresh_token) {
        response.cookies.set('refresh_token', data.refresh_token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        })
      }
      return response;
    } catch (err) {
      console.error('Refresh failed:', err.message)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

// Configure the middleware to run only on API routes
export const config = {
  matcher: ['/dashboard/:path*'],
}