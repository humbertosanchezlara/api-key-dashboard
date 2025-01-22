import Link from 'next/link';
import {
  LayoutDashboard,
  Bot,
  FileBarChart,
  Gamepad2,
  Receipt,
  BookOpen,
  User
} from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold">Humbi Key Service</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4">
        <div className="space-y-1">
          <Link 
            href="/dashboards" 
            className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <LayoutDashboard className="mr-3 h-4 w-4" />
            Overview
          </Link>

          <Link 
            href="#" 
            className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Bot className="mr-3 h-4 w-4" />
            Research Assistant
          </Link>

          <Link 
            href="#" 
            className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <FileBarChart className="mr-3 h-4 w-4" />
            Research Reports
          </Link>

          <Link 
            href="/playground" 
            className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Gamepad2 className="mr-3 h-4 w-4" />
            API Playground
          </Link>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 space-y-1">
          <Link 
            href="#" 
            className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <Receipt className="mr-3 h-4 w-4" />
            Invoices
          </Link>

          <Link 
            href="#" 
            className="flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <BookOpen className="mr-3 h-4 w-4" />
            Documentation
          </Link>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">User Name</p>
          </div>
        </div>
      </div>
    </div>
  );
} 