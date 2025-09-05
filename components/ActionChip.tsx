'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ActionChipProps {
  children: ReactNode;
  variant?: 'default' | 'selected';
  onClick?: () => void;
  icon?: ReactNode;
}

export function ActionChip({ 
  children, 
  variant = 'default', 
  onClick,
  icon 
}: ActionChipProps) {
  const baseClasses = 'inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200';
  const variantClasses = {
    default: 'bg-white bg-opacity-10 text-white hover:bg-opacity-20 border border-white border-opacity-20',
    selected: 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg'
  };

  return (
    <button 
      className={cn(baseClasses, variantClasses[variant])}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
