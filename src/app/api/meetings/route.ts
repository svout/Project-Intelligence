import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const projectId = searchParams.get('project_id');

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query = supabase
      .from('meetings')
      .select('*')
      .order('meeting_date', { ascending: false });

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data: meetings, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      project_id,
      title,
      transcript,
      participants,
      duration_minutes,
      meeting_date,
    } = body;

    if (!project_id || !title || !transcript) {
      return NextResponse.json(
        { error: 'Missing required fields: project_id, title, transcript' },
        { status: 400 },
      );
    }

    const { data: meeting, error } = await supabase
      .from('meetings')
      .insert({
        project_id,
        title,
        transcript,
        participants: participants || [],
        duration_minutes: duration_minutes || null,
        meeting_date: meeting_date || new Date().toISOString(),
        created_by: user.id,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: meeting }, { status: 201 });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

