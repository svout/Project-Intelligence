// lib/loom/client.ts
// Loom API Client

import type { LoomVideo, LoomTranscript } from '@/types/meetings';

const LOOM_API_BASE = 'https://www.loom.com/api/v1';

export class LoomClient {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${LOOM_API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Loom API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Get all videos for the authenticated user
   */
  async getVideos(limit: number = 50): Promise<LoomVideo[]> {
    const response = await this.request<{ videos: LoomVideo[] }>(
      `/videos?limit=${limit}`
    );
    return response.videos;
  }

  /**
   * Get a specific video by ID
   */
  async getVideo(videoId: string): Promise<LoomVideo> {
    return this.request<LoomVideo>(`/videos/${videoId}`);
  }

  /**
   * Get transcript for a video
   */
  async getTranscript(videoId: string): Promise<LoomTranscript> {
    try {
      const response = await this.request<{
        sentences: Array<{
          text: string;
          start: number;
          end: number;
        }>;
      }>(`/videos/${videoId}/transcript`);

      // Combine sentences into full text
      const full_text = response.sentences
        .map(s => s.text)
        .join(' ');

      return {
        video_id: videoId,
        sentences: response.sentences,
        full_text,
      };
    } catch (error) {
      console.error(`Failed to fetch transcript for video ${videoId}:`, error);
      throw error;
    }
  }

  /**
   * Get workspace info
   */
  async getWorkspace(): Promise<{ id: string; name: string }> {
    return this.request<{ id: string; name: string }>('/workspaces/current');
  }
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeLoomCode(
  code: string,
  redirectUri: string
): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const response = await fetch('https://www.loom.com/api/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.LOOM_CLIENT_ID!,
      client_secret: process.env.LOOM_CLIENT_SECRET!,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Refresh Loom access token
 */
export async function refreshLoomToken(
  refreshToken: string
): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const response = await fetch('https://www.loom.com/api/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.LOOM_CLIENT_ID!,
      client_secret: process.env.LOOM_CLIENT_SECRET!,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  return response.json();
}

/**
 * Generate Loom OAuth authorization URL
 */
export function getLoomAuthorizationUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_LOOM_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'video:read workspace:read',
  });

  return `https://www.loom.com/oauth/authorize?${params.toString()}`;
}
