import { NextRequest, NextResponse } from 'next/server';
import { TrustedContact } from '@/lib/types';

// In-memory storage for demo (in production, use a database)
const users = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, contact } = body;

    if (!userId || !contact) {
      return NextResponse.json({ error: 'User ID and contact required' }, { status: 400 });
    }

    if (!contact.name || !contact.phone) {
      return NextResponse.json({ error: 'Contact name and phone required' }, { status: 400 });
    }

    // Get user or create if doesn't exist
    let user = users.get(userId);
    if (!user) {
      user = {
        userId,
        trustedContacts: []
      };
    }

    // Add new contact with unique ID
    const newContact: TrustedContact = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    };

    user.trustedContacts = user.trustedContacts || [];
    user.trustedContacts.push(newContact);
    users.set(userId, user);

    return NextResponse.json({ contact: newContact }, { status: 201 });
  } catch (error) {
    console.error('Error adding trusted contact:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const contactId = searchParams.get('contactId');

    if (!userId || !contactId) {
      return NextResponse.json({ error: 'User ID and contact ID required' }, { status: 400 });
    }

    const user = users.get(userId);
    if (!user || !user.trustedContacts) {
      return NextResponse.json({ error: 'User or contacts not found' }, { status: 404 });
    }

    // Remove contact
    user.trustedContacts = user.trustedContacts.filter((contact: TrustedContact) => contact.id !== contactId);
    users.set(userId, user);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing trusted contact:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const user = users.get(userId);
    const contacts = user?.trustedContacts || [];

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching trusted contacts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
