'use client';

import { useState } from 'react';
import Sidebar from '../Sidebar';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background">
      <div className={`fixed md:relative transition-all duration-300 z-20 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:-translate-x-64'
      }`}>
        <Sidebar />
      </div>

      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed md:absolute top-4 transition-all duration-300 p-2 rounded-md hover:bg-gray-100 z-30 ${
          isSidebarOpen 
            ? 'left-4 md:left-[272px]'
            : 'left-4'
        }`}
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      <main className="flex-1 p-8 md:ml-64">
        {children}
      </main>
    </div>
  );
} 