import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function generateEncounterId(): string {
  return `encounter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function shareEncounterCard(encounter: any): void {
  const shareData = {
    title: 'Know Your Rights - Encounter Record',
    text: `Encounter recorded on ${formatDate(encounter.timestamp)} at ${encounter.location}`,
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // Fallback to clipboard
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    navigator.clipboard.writeText(shareText);
    alert('Encounter details copied to clipboard');
  }
}
