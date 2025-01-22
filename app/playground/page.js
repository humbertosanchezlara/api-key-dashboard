'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();
      console.log('API Response:', data); // Debug log

      if (data.valid) {
        toast('Valid API key, /protected can be accessed', {
          type: 'success',
        });
        router.push('/protected');
      } else {
        toast('Invalid API key', {
          type: 'error',
        });
      }
    } catch (error) {
      console.error('API error:', error);
      toast('Error validating API key', {
        type: 'error',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-900">Pages</Link>
        <span className="mx-2 text-gray-500">/</span>
        <span>API Playground</span>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-8">API Playground</h1>
        <div className="max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                Enter API Key
              </label>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your API key"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              Validate Key
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 