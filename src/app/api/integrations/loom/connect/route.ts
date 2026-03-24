// app/api/integrations/loom/connect/route.ts
// Loom OAuth Connection

import { NextRequest, NextResponse } from 'next/server';
import { getLoomAuthorizationUrl } from '@/lib/loom/client';

export async function GET(request: NextRequest) {
  try {
    // Get redirect URI from environment or construct it
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/loom/callback`;

    // Generate OAuth authorization URL
    const authUrl = getLoomAuthorizationUrl(redirectUri);

    // Redirect user to Loom OAuth page
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Loom connect error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Loom connection' },
      { status: 500 }
    );
  }
}
