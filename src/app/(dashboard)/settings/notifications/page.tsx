'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Toggle from '@/components/elements/Toggle';
import Button from '@/components/elements/Button';

export default function NotificationsSettingsPage() {
  const [aiInsights, setAiInsights] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [meetingAnalysis, setMeetingAnalysis] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select(
          'notify_ai_insights, notify_risk_alerts, notify_meeting_analysis, notify_weekly_reports'
        )
        .eq('id', user.id)
        .single();
      if (profile) {
        setAiInsights(profile.notify_ai_insights ?? true);
        setRiskAlerts(profile.notify_risk_alerts ?? true);
        setMeetingAnalysis(profile.notify_meeting_analysis ?? true);
        setWeeklyReports(profile.notify_weekly_reports ?? false);
      }
    })();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      await supabase
        .from('profiles')
        .update({
          notify_ai_insights: aiInsights,
          notify_risk_alerts: riskAlerts,
          notify_meeting_analysis: meetingAnalysis,
          notify_weekly_reports: weeklyReports,
        })
        .eq('id', user.id);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Notifications</h1>
        <p className="text-body text-text-secondary max-w-2xl">
          Choose which alerts you want Project Intelligence to send.
        </p>
      </div>

      <div className="glass-card max-w-2xl space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-small font-medium text-text-primary">AI insights</p>
            <p className="text-tiny text-text-secondary">
              Get notified when new AI insights are generated for your projects.
            </p>
          </div>
          <Toggle checked={aiInsights} onClick={() => setAiInsights((v) => !v)} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-small font-medium text-text-primary">Risk alerts</p>
            <p className="text-tiny text-text-secondary">
              Alerts when risk scores spike or critical blockers appear.
            </p>
          </div>
          <Toggle checked={riskAlerts} onClick={() => setRiskAlerts((v) => !v)} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-small font-medium text-text-primary">Meeting analysis</p>
            <p className="text-tiny text-text-secondary">
              Notify you when meeting transcripts have been fully analyzed.
            </p>
          </div>
          <Toggle
            checked={meetingAnalysis}
            onClick={() => setMeetingAnalysis((v) => !v)}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-small font-medium text-text-primary">Weekly reports</p>
            <p className="text-tiny text-text-secondary">
              A weekly summary of risks, blockers, and progress across projects.
            </p>
          </div>
          <Toggle
            checked={weeklyReports}
            onClick={() => setWeeklyReports((v) => !v)}
          />
        </div>

        <div className="pt-2">
          <Button variant="primary" size="md" onClick={handleSave} loading={saving}>
            Save preferences
          </Button>
        </div>
      </div>
    </div>
  );
}

