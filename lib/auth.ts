// lib/auth.ts
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  name: string;
  email: string;
  exp: number;
}

export function getUserFromToken(): DecodedToken | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    console.log("Decoded User:", decoded); // 🔍 Log it
    return decoded;
  } catch {
    return null;
  }
}
