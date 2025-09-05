import { NextRequest, NextResponse } from 'next/server';
import { Encounter } from '@/lib/types';

// In-memory storage for demo (in production, use a database)
const encounters = new Map<string, Encounter>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const encounterId = searchParams.get('encounterId');

    if (encounterId) {
      const encounter = encounters.get(encounterId);
      if (!encounter) {
        return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
      }
      return NextResponse.json({ encounter });
    }

    if (userId) {
      const userEncounters = Array.from(encounters.values())
        .filter(encounter => encounter.userId === userId)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      return NextResponse.json({ encounters: userEncounters });
    }

    return NextResponse.json({ error: 'User ID or Encounter ID required' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching encounters:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, location, scriptUsed, recordingUrl, notes } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const encounterId = `encounter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const encounter: Encounter = {
      encounterId,
      userId,
      timestamp: new Date(),
      location: location || 'Unknown',
      scriptUsed,
      recordingUrl,
      notes: notes || '',
      sharedWith: []
    };

    encounters.set(encounterId, encounter);

    return NextResponse.json({ encounter }, { status: 201 });
  } catch (error) {
    console.error('Error creating encounter:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { encounterId, updates } = body;

    if (!encounterId) {
      return NextResponse.json({ error: 'Encounter ID required' }, { status: 400 });
    }

    const encounter = encounters.get(encounterId);
    if (!encounter) {
      return NextResponse.json({ error: 'Encounter not found' }, { status: 404 });
    }

    const updatedEncounter = { ...encounter, ...updates };
    encounters.set(encounterId, updatedEncounter);

    return NextResponse.json({ encounter: updatedEncounter });
  } catch (error) {
    console.error('Error updating encounter:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
