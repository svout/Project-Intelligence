import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('/settings/integrations?provider=slack&status=coming-soon');
}
