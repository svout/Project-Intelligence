'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/elements/Button';
import { Input } from '@/components/elements/Input';

interface Member {
  id: string;
  full_name: string | null;
  email: string;
  role?: string | null;
}

export default function TeamSettingsPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [invite, setInvite] = useState({ name: '', email: '', role: 'Member' });

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    const supabase = createClient();
    const { data } = await supabase.from('profiles').select('id, full_name, email, role');
    setMembers((data || []) as Member[]);
  }

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: real invite flow can be wired to an /api/invitations route
    setInvite({ name: '', email: '', role: 'Member' });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Team</h1>
        <p className="text-body text-text-secondary max-w-2xl">
          Manage who has access to Project Intelligence in your workspace.
        </p>
      </div>

      <div className="glass-card max-w-2xl space-y-4">
        <h2 className="text-h3 font-semibold text-text-primary">Invite member</h2>
        <form onSubmit={handleInvite} className="space-y-4">
          <Input
            label="Name"
            value={invite.name}
            onChange={(e) => setInvite((v) => ({ ...v, name: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            value={invite.email}
            onChange={(e) => setInvite((v) => ({ ...v, email: e.target.value }))}
          />
          <Input
            label="Role"
            value={invite.role}
            onChange={(e) => setInvite((v) => ({ ...v, role: e.target.value }))}
          />
          <Button type="submit" variant="primary" size="md">
            Send invite
          </Button>
        </form>
      </div>

      <div className="glass-card max-w-3xl">
        <h2 className="text-h3 font-semibold text-text-primary mb-4">Team members</h2>
        <div className="divide-y divide-white/[0.06]">
          {members.map((m) => (
            <div key={m.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-small font-medium text-text-primary">
                  {m.full_name || m.email}
                </p>
                <p className="text-tiny text-text-secondary">{m.email}</p>
              </div>
              <p className="text-tiny text-text-muted">{m.role || 'Member'}</p>
            </div>
          ))}
          {members.length === 0 && (
            <p className="py-4 text-small text-text-secondary">
              You&apos;re the first member of this workspace.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

