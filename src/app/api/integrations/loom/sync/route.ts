// app/api/integrations/loom/sync/route.ts
// Sync Loom videos and transcripts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { LoomClient } from '@/lib/loom/client';
import type { SyncLoomResponse } from '@/types/meetings';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Loom integration
    const { data: integration, error: integrationError } = await supabase
      .from('integrations')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider', 'loom')
      .single();

    if (integrationError || !integration) {
      return NextResponse.json(
        { error: 'Loom integration not found. Please connect Loom first.' },
        { status: 404 }
      );
    }

    // Initialize Loom client
    const loomClient = new LoomClient(integration.access_token);

    // Fetch videos from Loom
    const videos = await loomClient.getVideos(50);

    let syncedVideos = 0;
    let newMeetings = 0;
    let updatedMeetings = 0;

    // Process each video
    for (const video of videos) {
      try {
        // Check if video already exists
        const { data: existingMeeting } = await supabase
          .from('meetings')
          .select('id, processed')
          .eq('external_id', video.id)
          .eq('user_id', user.id)
          .single();

        if (existingMeeting && existingMeeting.processed) {
          // Skip already processed meetings
          continue;
        }

        // Fetch transcript
        let transcript: string | undefined;
        try {
          const transcriptData = await loomClient.getTranscript(video.id);
          transcript = transcriptData.full_text;
        } catch (error) {
          console.warn(`No transcript available for video ${video.id}`);
          transcript = undefined;
        }

        const meetingData = {
          user_id: user.id,
          source: 'loom' as const,
          external_id: video.id,
          external_url: video.shared_url,
          title: video.title,
          description: video.description || null,
          transcript,
          duration_seconds: video.duration,
          thumbnail_url: video.thumbnail_url,
          host: video.owner.name,
          participants: [video.owner.name],
          processed: false,
          meeting_date: video.created_at,
        };

        if (existingMeeting) {
          // Update existing meeting
          const { error: updateError } = await supabase
            .from('meetings')
            .update(meetingData)
            .eq('id', existingMeeting.id);

          if (!updateError) {
            updatedMeetings++;
          }
        } else {
          // Insert new meeting
          const { error: insertError } = await supabase
            .from('meetings')
            .insert(meetingData);

          if (!insertError) {
            newMeetings++;
          }
        }

        syncedVideos++;
      } catch (error) {
        console.error(`Failed to sync video ${video.id}:`, error);
        // Continue with next video
      }
    }

    const response: SyncLoomResponse = {
      synced_videos: syncedVideos,
      new_meetings: newMeetings,
      updated_meetings: updatedMeetings,
    };

    return NextResponse.json({
      data: response,
      message: `Successfully synced ${syncedVideos} videos`,
    });
  } catch (error) {
    console.error('Loom sync error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to sync Loom videos',
      },
      { status: 500 }
    );
  }
}
