// lib/auth.ts
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  name: string;
  email: string;
  isProfileCompleted: boolean;
  exp: number;
}

export function getUserFromToken(): DecodedToken | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      // Token is expired, remove it
      localStorage.removeItem('token');
      return null;
    }

    console.log("Decoded User:", decoded); // 🔍 Log it
    return decoded;
  } catch {
    // Token is invalid, remove it
    localStorage.removeItem('token');
    return null;
  }
}
