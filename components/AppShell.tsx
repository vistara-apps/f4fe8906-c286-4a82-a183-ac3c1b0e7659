'use client';

import { ReactNode } from 'react';
import { Shield, Menu, Bell } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  title?: string;
}

export function AppShell({ children, title = 'Know Your Rights Cards' }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="glass-card mx-4 mt-4 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">{title}</h1>
              <p className="text-sm text-gray-300">Legal protection in your pocket</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-screen-sm mx-auto px-4 py-6">
        {children}
      </main>

      {/* Emergency Actions Bar */}
      <div className="fixed bottom-4 left-4 right-4 max-w-screen-sm mx-auto">
        <div className="glass-card p-4 rounded-lg">
          <div className="flex items-center justify-center space-x-4">
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span>Emergency Record</span>
            </button>
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
              Alert Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
