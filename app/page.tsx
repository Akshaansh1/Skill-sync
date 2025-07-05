// app/page.tsx
import React from 'react';
import Index from './components/Index';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Index />
    </main>
  );
}
