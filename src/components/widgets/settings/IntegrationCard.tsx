'use client';

import Button from '@/components/elements/Button';
import { Card } from '@/components/elements/Card';

export type IntegrationStatus = 'not_connected' | 'connected' | 'syncing';

interface IntegrationCardProps {
  name: 'Jira' | 'Slack' | 'Notion' | 'Loom';
  description: string;
  status: IntegrationStatus;
  onConnect?: () => void;
  onSync?: () => void;
  onDisconnect?: () => void;
}

export function IntegrationCard({
  name,
  description,
  status,
  onConnect,
  onSync,
  onDisconnect,
}: IntegrationCardProps) {
  const isConnected = status === 'connected' || status === 'syncing';

  const statusLabel =
    status === 'connected'
      ? 'Connected'
      : status === 'syncing'
      ? 'Syncing...'
      : 'Not connected';

  return (
    <Card depth={1} hover className="flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-h3 font-semibold text-text-primary">{name}</h3>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-tiny font-medium ${
              status === 'connected'
                ? 'bg-semantic-success/10 text-semantic-success border border-semantic-success/20'
                : status === 'syncing'
                ? 'bg-accent-indigo/10 text-accent-indigo border border-accent-indigo/20'
                : 'bg-white/5 text-text-secondary border border-white/10'
            }`}
          >
            {statusLabel}
          </span>
        </div>
        <p className="text-small text-text-secondary">{description}</p>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {!isConnected && (
          <Button variant="primary" size="sm" onClick={onConnect}>
            Connect
          </Button>
        )}
        {status === 'connected' && (
          <>
            <Button variant="secondary" size="sm" onClick={onSync}>
              Sync
            </Button>
            <Button variant="ghost" size="sm" onClick={onDisconnect}>
              Disconnect
            </Button>
          </>
        )}
        {status === 'syncing' && (
          <Button variant="secondary" size="sm" loading>
            Syncing
          </Button>
        )}
      </div>
    </Card>
  );
}

export default IntegrationCard;

