'use client';

import { useState, useEffect } from 'react';
import { User, StateLaw, Script, Encounter } from './types';
import { stateLaws, scripts } from './data';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser({
        userId: 'user-123',
        farcasterId: 'farcaster-456',
        currentLocation: 'CA',
        savedStates: ['CA'],
        subscriptionStatus: 'free',
        trustedContacts: []
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return { user, loading, updateUser };
}

export function useStateLaw(stateCode?: string) {
  const [stateLaw, setStateLaw] = useState<StateLaw | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stateCode && stateLaws[stateCode]) {
      setLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setStateLaw(stateLaws[stateCode]);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [stateCode]);

  return { stateLaw, loading };
}

export function useScripts() {
  const [scriptList, setScriptList] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading scripts
    const timer = setTimeout(() => {
      setScriptList(Object.values(scripts));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { scripts: scriptList, loading };
}

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Handle recording data
          console.log('Recording data available:', event.data);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      recorder.onstop = () => {
        clearInterval(timer);
        stream.getTracks().forEach(track => track.stop());
      };

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isRecording,
    recordingTime: formatTime(recordingTime),
    startRecording,
    stopRecording
  };
}

export function useLocation() {
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd reverse geocode to get state
        // For demo, we'll just set a default
        setLocation('CA');
        setLoading(false);
      },
      (error) => {
        setError('Unable to retrieve location.');
        setLoading(false);
      }
    );
  };

  return { location, loading, error, getCurrentLocation };
}
