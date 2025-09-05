import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, location, message, contacts } = body;

    if (!userId || !contacts || contacts.length === 0) {
      return NextResponse.json({ error: 'User ID and contacts required' }, { status: 400 });
    }

    // In a real implementation, this would:
    // 1. Send SMS messages via Twilio or similar service
    // 2. Send push notifications
    // 3. Log the alert in the database
    
    const alertMessage = message || `Emergency alert from Know Your Rights Cards app. Location: ${location || 'Unknown'}. Please check on me.`;
    
    // Simulate sending alerts to all contacts
    const alertResults = contacts.map((contact: any) => ({
      contactId: contact.id,
      contactName: contact.name,
      contactPhone: contact.phone,
      status: 'sent', // In real implementation, this would be the actual send status
      timestamp: new Date().toISOString()
    }));

    // Log the alert
    console.log(`Alert sent for user ${userId}:`, {
      message: alertMessage,
      location,
      contacts: alertResults,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      alertId: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message: alertMessage,
      sentTo: alertResults.length,
      results: alertResults
    });
  } catch (error) {
    console.error('Error sending alert:', error);
    return NextResponse.json({ error: 'Failed to send alert' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // In a real implementation, this would fetch alert history from database
    // For demo, return empty array
    return NextResponse.json({ alerts: [] });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
