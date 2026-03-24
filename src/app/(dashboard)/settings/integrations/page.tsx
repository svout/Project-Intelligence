'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import IntegrationCard, { IntegrationStatus } from '@/components/widgets/settings/IntegrationCard';

type Provider = 'jira' | 'slack' | 'notion' | 'loom';

interface IntegrationRow {
  provider: Provider;
}

export default function IntegrationsSettingsPage() {
  const [connected, setConnected] = useState<Record<Provider, IntegrationStatus>>({
    jira: 'not_connected',
    slack: 'not_connected',
    notion: 'not_connected',
    loom: 'not_connected',
  });

  const loadIntegrations = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('integrations')
      .select('provider')
      .eq('user_id', user.id);

    if (!data) return;

    setConnected((prev) => {
      const next = { ...prev };
      (data as IntegrationRow[]).forEach((row) => {
        next[row.provider] = 'connected';
      });
      return next;
    });
  }, []);

  useEffect(() => {
    void loadIntegrations();
  }, [loadIntegrations]);

  function openConnect(provider: Provider) {
    window.location.href = `/api/integrations/${provider}/connect`;
  }

  async function handleSyncLoom() {
    setConnected((prev) => ({ ...prev, loom: 'syncing' }));
    try {
      await fetch('/api/integrations/loom/sync', { method: 'POST' });
      await loadIntegrations();
    } finally {
      setConnected((prev) => ({ ...prev, loom: 'connected' }));
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Integrations</h1>
        <p className="text-body text-text-secondary max-w-2xl">
          Connect Project Intelligence to the tools where work already happens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntegrationCard
          name="Jira"
          description="Sync issues and epics so AI can correlate risks and blockers with your sprint."
          status={connected.jira}
          onConnect={() => openConnect('jira')}
        />
        <IntegrationCard
          name="Slack"
          description="Analyze team conversations to surface hidden risks and follow-ups."
          status={connected.slack}
          onConnect={() => openConnect('slack')}
        />
        <IntegrationCard
          name="Notion"
          description="Connect docs and specs so AI can understand project context."
          status={connected.notion}
          onConnect={() => openConnect('notion')}
        />
        <IntegrationCard
          name="Loom"
          description="Automatically analyze meeting recordings and generate AI insights."
          status={connected.loom}
          onConnect={() => openConnect('loom')}
          onSync={connected.loom === 'connected' ? handleSyncLoom : undefined}
        />
      </div>
    </div>
  );
}

