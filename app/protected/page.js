'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function Protected() {
  const router = useRouter();

  useEffect(() => {
    const validateAccess = async () => {
      try {
        const response = await fetch('/api/check-access');
        const data = await response.json();

        if (!data.valid) {
          toast('Unauthorized access', {
            type: 'error',
          });
          router.push('/playground');
        }
      } catch (error) {
        console.error('Access check error:', error);
        toast('Error checking access', {
          type: 'error',
        });
        router.push('/playground');
      }
    };

    validateAccess();
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-900">Pages</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span>Protected</span>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
        <p className="text-gray-600">Welcome! This is a protected page that can only be accessed with a valid API key.</p>
      </div>
    </div>
  );
} 