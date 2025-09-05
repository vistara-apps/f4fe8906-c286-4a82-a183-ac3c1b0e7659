'use client';

import { Mic, Square } from 'lucide-react';
import { useRecording } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface RecordingButtonProps {
  variant?: 'active' | 'inactive';
  onRecordingStart?: () => void;
  onRecordingStop?: (recordingData: any) => void;
}

export function RecordingButton({ 
  variant = 'inactive',
  onRecordingStart,
  onRecordingStop 
}: RecordingButtonProps) {
  const { isRecording, recordingTime, startRecording, stopRecording } = useRecording();

  const handleToggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      onRecordingStop?.(null); // In a real app, pass recording data
    } else {
      await startRecording();
      onRecordingStart?.();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleToggleRecording}
        className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg',
          isRecording 
            ? 'bg-red-500 hover:bg-red-600 recording-pulse' 
            : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600'
        )}
      >
        {isRecording ? (
          <Square className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
      
      {isRecording && (
        <div className="text-center">
          <div className="text-white font-mono text-lg">{recordingTime}</div>
          <div className="text-gray-300 text-sm">Recording...</div>
        </div>
      )}
      
      {!isRecording && (
        <div className="text-center">
          <div className="text-white text-sm font-medium">Tap to Record</div>
          <div className="text-gray-300 text-xs">Audio will be saved securely</div>
        </div>
      )}
    </div>
  );
}
