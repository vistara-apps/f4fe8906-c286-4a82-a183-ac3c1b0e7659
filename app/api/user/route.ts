import { NextRequest, NextResponse } from 'next/server';
import { User, TrustedContact } from '@/lib/types';

// In-memory storage for demo (in production, use a database)
const users = new Map<string, User>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const farcasterId = searchParams.get('farcasterId');

    if (!userId && !farcasterId) {
      return NextResponse.json({ error: 'User ID or Farcaster ID required' }, { status: 400 });
    }

    // Find user by ID or Farcaster ID
    let user: User | undefined;
    if (userId) {
      user = users.get(userId);
    } else if (farcasterId) {
      user = Array.from(users.values()).find(u => u.farcasterId === farcasterId);
    }

    if (!user) {
      // Create new user if not found
      const newUserId = userId || `user-${Date.now()}`;
      user = {
        userId: newUserId,
        farcasterId: farcasterId || undefined,
        currentLocation: 'CA',
        savedStates: ['CA'],
        subscriptionStatus: 'free',
        trustedContacts: []
      };
      users.set(newUserId, user);
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = users.get(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update user data
    const updatedUser = { ...user, ...updates };
    users.set(userId, updatedUser);

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, currentLocation } = body;

    const userId = `user-${Date.now()}`;
    const newUser: User = {
      userId,
      farcasterId,
      currentLocation: currentLocation || 'CA',
      savedStates: [currentLocation || 'CA'],
      subscriptionStatus: 'free',
      trustedContacts: []
    };

    users.set(userId, newUser);

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
