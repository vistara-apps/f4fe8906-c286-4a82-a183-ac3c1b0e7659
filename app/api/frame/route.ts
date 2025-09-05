import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state') || 'CA';
  
  // Generate frame HTML for Farcaster
  const frameHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Know Your Rights Cards</title>
        
        <!-- Farcaster Frame Meta Tags -->
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?state=${state}">
        <meta property="fc:frame:button:1" content="View ${state} Laws">
        <meta property="fc:frame:button:2" content="Record">
        <meta property="fc:frame:button:3" content="Alert">
        <meta property="fc:frame:button:4" content="Change State">
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/action">
        
        <!-- Open Graph -->
        <meta property="og:title" content="Know Your Rights Cards">
        <meta property="og:description" content="Instant legal scripts and rights summaries in your pocket">
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame/image?state=${state}">
        
        <!-- Base Mini App Meta Tags -->
        <meta name="minikit:app-name" content="Know Your Rights Cards">
        <meta name="minikit:app-description" content="Legal protection in your pocket">
        <meta name="minikit:app-icon" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/icon.png">
      </head>
      <body>
        <h1>Know Your Rights Cards</h1>
        <p>Instant legal scripts and rights summaries for ${state}</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}">Open App</a>
      </body>
    </html>
  `;

  return new NextResponse(frameHtml, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;
    
    const buttonIndex = untrustedData?.buttonIndex;
    const state = untrustedData?.state || 'CA';
    
    let responseImage = '';
    let buttons = [];
    
    switch (buttonIndex) {
      case 1: // View State Laws
        responseImage = `/api/frame/image?state=${state}&view=laws`;
        buttons = [
          { text: 'Back to Menu' },
          { text: 'Change State' },
          { text: 'View Scripts' },
          { text: 'Open App', action: 'link', target: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' }
        ];
        break;
        
      case 2: // Record
        responseImage = `/api/frame/image?view=record`;
        buttons = [
          { text: 'Back to Menu' },
          { text: 'Open App', action: 'link', target: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' }
        ];
        break;
        
      case 3: // Alert
        responseImage = `/api/frame/image?view=alert`;
        buttons = [
          { text: 'Back to Menu' },
          { text: 'Open App', action: 'link', target: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' }
        ];
        break;
        
      case 4: // Change State
        responseImage = `/api/frame/image?view=states`;
        buttons = [
          { text: 'California' },
          { text: 'New York' },
          { text: 'Texas' },
          { text: 'Back to Menu' }
        ];
        break;
        
      default:
        responseImage = `/api/frame/image?state=${state}`;
        buttons = [
          { text: `View ${state} Laws` },
          { text: 'Record' },
          { text: 'Alert' },
          { text: 'Change State' }
        ];
    }
    
    const frameResponse = {
      image: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${responseImage}`,
      buttons: buttons.slice(0, 4) // Max 4 buttons
    };
    
    return NextResponse.json(frameResponse);
  } catch (error) {
    console.error('Frame action error:', error);
    return NextResponse.json({ error: 'Frame action failed' }, { status: 500 });
  }
}
