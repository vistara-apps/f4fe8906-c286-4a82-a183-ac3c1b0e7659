'use client';

import { useState } from 'react';
import { Script, Language } from '@/lib/types';
import { ContentCard } from './ContentCard';
import { Copy, Globe } from 'lucide-react';

interface ScriptViewerProps {
  script: Script;
  variant?: 'default' | 'spanish';
}

export function ScriptViewer({ script, variant = 'default' }: ScriptViewerProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [copied, setCopied] = useState(false);

  const currentText = language === 'en' ? script.englishText : script.spanishText;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <ContentCard>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{script.title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
              title={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
            >
              <Globe className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
              title="Copy script"
            >
              <Copy className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Language indicator */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">
            {language === 'en' ? 'English' : 'Español'}
          </span>
          {copied && (
            <span className="text-sm text-green-400">Copied!</span>
          )}
        </div>

        {/* Script content */}
        <div className="bg-black bg-opacity-20 rounded-lg p-4">
          <pre className="text-white text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {currentText}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="btn-primary text-sm">
            Save to Encounter
          </button>
          <button className="btn-secondary text-sm">
            Share Script
          </button>
        </div>
      </div>
    </ContentCard>
  );
}
