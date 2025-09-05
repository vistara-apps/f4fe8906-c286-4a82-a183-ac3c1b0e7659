'use client';

import { useState } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { ContentCard } from './ContentCard';

interface AlertButtonProps {
  variant?: 'default';
  trustedContacts?: Array<{ name: string; phone: string }>;
}

export function AlertButton({ variant = 'default', trustedContacts = [] }: AlertButtonProps) {
  const [alertSent, setAlertSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSendAlert = async () => {
    if (trustedContacts.length === 0) {
      alert('Please set up trusted contacts first in your profile.');
      return;
    }

    setSending(true);
    
    // Simulate sending alert
    setTimeout(() => {
      setAlertSent(true);
      setSending(false);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setAlertSent(false);
      }, 5000);
    }, 2000);
  };

  if (alertSent) {
    return (
      <ContentCard className="bg-green-500 bg-opacity-20 border-green-400">
        <div className="flex items-center justify-center space-x-3 py-4">
          <Check className="w-6 h-6 text-green-400" />
          <div className="text-center">
            <div className="text-green-400 font-medium">Alert Sent Successfully</div>
            <div className="text-green-300 text-sm">
              Notified {trustedContacts.length} contact{trustedContacts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </ContentCard>
    );
  }

  return (
    <ContentCard>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-orange-500 bg-opacity-20 rounded-full">
            <AlertTriangle className="w-8 h-8 text-orange-400" />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Emergency Alert</h3>
          <p className="text-gray-300 text-sm">
            Send your location and status to trusted contacts immediately
          </p>
        </div>

        <button
          onClick={handleSendAlert}
          disabled={sending}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
        >
          {sending ? 'Sending Alert...' : 'Send Emergency Alert'}
        </button>

        <div className="text-xs text-gray-400">
          {trustedContacts.length > 0 
            ? `Will notify ${trustedContacts.length} trusted contact${trustedContacts.length !== 1 ? 's' : ''}`
            : 'No trusted contacts set up'
          }
        </div>
      </div>
    </ContentCard>
  );
}
