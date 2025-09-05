'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  children: ReactNode;
  variant?: 'default' | 'highlight';
  className?: string;
  onClick?: () => void;
}

export function ContentCard({ 
  children, 
  variant = 'default', 
  className = '',
  onClick 
}: ContentCardProps) {
  const baseClasses = 'glass-card p-6 rounded-lg transition-all duration-200';
  const variantClasses = {
    default: 'hover:bg-opacity-15',
    highlight: 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600'
  };

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className, onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
