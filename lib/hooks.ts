'use client';

import { useState, useEffect } from 'react';
import { User, StateLaw, Script, Encounter } from './types';
import { stateLaws, scripts } from './data';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Try to get user from localStorage first
        const storedUserId = localStorage.getItem('kyr_user_id');
        const storedFarcasterId = localStorage.getItem('kyr_farcaster_id');
        
        const params = new URLSearchParams();
        if (storedUserId) params.append('userId', storedUserId);
        if (storedFarcasterId) params.append('farcasterId', storedFarcasterId);
        
        if (params.toString()) {
          const response = await fetch(`/api/user?${params}`);
          if (response.ok) {
            const { user } = await response.json();
            setUser(user);
            localStorage.setItem('kyr_user_id', user.userId);
            if (user.farcasterId) {
              localStorage.setItem('kyr_farcaster_id', user.farcasterId);
            }
          }
        } else {
          // Create new user
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              farcasterId: storedFarcasterId,
              currentLocation: 'CA'
            })
          });
          
          if (response.ok) {
            const { user } = await response.json();
            setUser(user);
            localStorage.setItem('kyr_user_id', user.userId);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        // Fallback to local user
        setUser({
          userId: 'local-user-' + Date.now(),
          currentLocation: 'CA',
          savedStates: ['CA'],
          subscriptionStatus: 'free',
          trustedContacts: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          updates
        })
      });
      
      if (response.ok) {
        const { user: updatedUser } = await response.json();
        setUser(updatedUser);
      } else {
        // Fallback to local update
        setUser(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      // Fallback to local update
      setUser(prev => prev ? { ...prev, ...updates } : null);
    }
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

export function useEncounters(userId?: string) {
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadEncounters = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/encounters?userId=${userId}`);
        if (response.ok) {
          const { encounters } = await response.json();
          setEncounters(encounters);
        }
      } catch (error) {
        console.error('Failed to load encounters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEncounters();
  }, [userId]);

  const createEncounter = async (encounterData: Omit<Encounter, 'encounterId' | 'timestamp' | 'sharedWith'>) => {
    try {
      const response = await fetch('/api/encounters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(encounterData)
      });

      if (response.ok) {
        const { encounter } = await response.json();
        setEncounters(prev => [encounter, ...prev]);
        return encounter;
      }
    } catch (error) {
      console.error('Failed to create encounter:', error);
      throw error;
    }
  };

  const updateEncounter = async (encounterId: string, updates: Partial<Encounter>) => {
    try {
      const response = await fetch('/api/encounters', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encounterId, updates })
      });

      if (response.ok) {
        const { encounter } = await response.json();
        setEncounters(prev => prev.map(e => e.encounterId === encounterId ? encounter : e));
        return encounter;
      }
    } catch (error) {
      console.error('Failed to update encounter:', error);
      throw error;
    }
  };

  return { encounters, loading, createEncounter, updateEncounter };
}

export function useTrustedContacts(userId?: string) {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const loadContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/trusted-contacts?userId=${userId}`);
        if (response.ok) {
          const { contacts } = await response.json();
          setContacts(contacts);
        }
      } catch (error) {
        console.error('Failed to load contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [userId]);

  const addContact = async (contact: Omit<TrustedContact, 'id'>) => {
    if (!userId) throw new Error('User ID required');

    try {
      const response = await fetch('/api/trusted-contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, contact })
      });

      if (response.ok) {
        const { contact: newContact } = await response.json();
        setContacts(prev => [...prev, newContact]);
        return newContact;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add contact');
      }
    } catch (error) {
      console.error('Failed to add contact:', error);
      throw error;
    }
  };

  const removeContact = async (contactId: string) => {
    if (!userId) throw new Error('User ID required');

    try {
      const response = await fetch(`/api/trusted-contacts?userId=${userId}&contactId=${contactId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setContacts(prev => prev.filter(c => c.id !== contactId));
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to remove contact');
      }
    } catch (error) {
      console.error('Failed to remove contact:', error);
      throw error;
    }
  };

  return { contacts, loading, addContact, removeContact };
}

export function useAlerts() {
  const [sending, setSending] = useState(false);

  const sendAlert = async (userId: string, location: string, contacts: TrustedContact[], message?: string) => {
    setSending(true);
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          location,
          message,
          contacts
        })
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send alert');
      }
    } catch (error) {
      console.error('Failed to send alert:', error);
      throw error;
    } finally {
      setSending(false);
    }
  };

  return { sendAlert, sending };
}
