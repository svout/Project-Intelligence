'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/elements/Button';
import { Input, Textarea } from '@/components/elements/Input';

export default function MeetingUploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    transcript: '',
    participants: '',
    duration: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();

      const { data: projects } = await supabase
        .from('projects')
        .select('id')
        .eq('status', 'active')
        .limit(1);

      if (!projects || projects.length === 0) {
        alert('Please create a project first');
        setLoading(false);
        return;
      }

      const projectId = projects[0].id;

      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          title: formData.title,
          transcript: formData.transcript,
          participants: formData.participants
            .split(',')
            .map((p) => p.trim())
            .filter(Boolean),
          duration_minutes: formData.duration
            ? parseInt(formData.duration)
            : null,
        }),
      });

      const { data: meeting, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      setAnalyzing(true);
      const analyzeResponse = await fetch('/api/meetings/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meeting_id: meeting.id }),
      });

      const analyzeResult = await analyzeResponse.json();

      if (analyzeResult.error) {
        throw new Error(analyzeResult.error);
      }

      router.push(`/meetings/${meeting.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert(
        `Error: ${
          error instanceof Error ? error.message : 'Failed to upload meeting'
        }`,
      );
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  }

  return (
    <div className="max-w-4xl px-6 py-6">
      <div className="mb-6">
        <h1 className="text-h1 font-semibold text-text-primary">Upload meeting transcript</h1>
        <p className="text-body text-text-secondary mt-2">
          Paste a transcript to let AI detect blockers, risks and follow-ups for this project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="card-base">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Meeting title"
                placeholder="Sprint Planning – Week 12"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />

              <Input
                label="Participants"
                placeholder="Alice, Bob, Charlie"
                value={formData.participants}
                onChange={(e) =>
                  setFormData({ ...formData, participants: e.target.value })
                }
                hint="Comma-separated list. Used to attribute follow-ups and risks."
              />

              <Input
                type="number"
                label="Duration (minutes)"
                placeholder="60"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                hint="Optional. Helps calibrate velocity and focus time."
              />

              <div className="space-y-2">
                <Textarea
                  label="Transcript"
                  placeholder="Paste the full meeting transcript here..."
                  value={formData.transcript}
                  onChange={(e) =>
                    setFormData({ ...formData, transcript: e.target.value })
                  }
                  required
                  className="font-mono text-[13px] min-h-[160px]"
                />
                <p className="text-tiny text-text-muted">
                  The AI will extract blockers, risks, decisions and follow-ups from this text.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={loading || analyzing}
                >
                  {analyzing
                    ? 'Analyzing with AI...'
                    : loading
                      ? 'Uploading...'
                      : 'Upload & analyze'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  fullWidth
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="card-base">
            <h2 className="text-h2 text-text-primary mb-2">What happens next</h2>
            <ul className="space-y-2 text-small text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-semantic-info/10 text-semantic-info text-[10px]">
                  1
                </span>
                <span>AI parses the transcript and detects blockers, risks and task updates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-semantic-info/10 text-semantic-info text-[10px]">
                  2
                </span>
                <span>Insights and follow-ups are saved into this project&apos;s dashboard.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-semantic-info/10 text-semantic-info text-[10px]">
                  3
                </span>
                <span>We generate a suggested agenda for your next check-in.</span>
              </li>
            </ul>
          </div>

          <div className="card-base">
            <p className="text-small text-text-secondary">
              For Loom recordings, you can also connect the Loom integration in Settings → Integrations
              and let Project Intelligence sync and analyze meetings automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
