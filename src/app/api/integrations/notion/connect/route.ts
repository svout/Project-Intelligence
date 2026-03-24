import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('/settings/integrations?provider=notion&status=coming-soon');
}
