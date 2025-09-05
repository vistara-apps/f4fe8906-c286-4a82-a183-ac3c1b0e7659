'use client';

import { Shield, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="glass-card p-8 rounded-lg text-center max-w-md w-full">
        <div className="p-4 bg-red-500 bg-opacity-20 rounded-full w-fit mx-auto mb-6">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        
        <p className="text-gray-300 mb-6">
          We encountered an error while loading your rights information. 
          Your safety is our priority - please try again.
        </p>
        
        <button
          onClick={reset}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Try Again</span>
        </button>
        
        <div className="mt-4 text-xs text-gray-400">
          If the problem persists, please contact support for immediate assistance.
        </div>
      </div>
    </div>
  );
}
