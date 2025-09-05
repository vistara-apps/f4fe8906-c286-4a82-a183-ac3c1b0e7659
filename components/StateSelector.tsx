'use client';

import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { US_STATES } from '@/lib/data';
import { ContentCard } from './ContentCard';

interface StateSelectorProps {
  selectedState?: string;
  onStateChange: (stateCode: string) => void;
}

export function StateSelector({ selectedState, onStateChange }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedStateName = US_STATES.find(state => state.code === selectedState)?.name || 'Select State';

  const handleStateSelect = (stateCode: string) => {
    onStateChange(stateCode);
    setIsOpen(false);
  };

  return (
    <ContentCard>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Your State</h3>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-black bg-opacity-20 text-white px-4 py-3 rounded-lg flex items-center justify-between hover:bg-opacity-30 transition-colors duration-200"
          >
            <span>{selectedStateName}</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-black bg-opacity-90 backdrop-blur-lg rounded-lg border border-white border-opacity-20 max-h-60 overflow-y-auto z-10">
              {US_STATES.map((state) => (
                <button
                  key={state.code}
                  onClick={() => handleStateSelect(state.code)}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                >
                  {state.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-gray-300 text-sm">
          Select your state to get relevant legal information and rights summaries.
        </p>
      </div>
    </ContentCard>
  );
}
