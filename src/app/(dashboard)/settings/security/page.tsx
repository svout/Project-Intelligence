'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/elements/Button';
import { Input } from '@/components/elements/Input';

export default function SecuritySettingsPage() {
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      await supabase.auth.updateUser({ password });
      setPassword('');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoutAll() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  function handleDeleteAccount(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: backend endpoint for account deletion can be wired later
    alert('Account deletion will be implemented with admin API.');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Security</h1>
        <p className="text-body text-text-secondary max-w-2xl">
          Protect your account and control access to Project Intelligence.
        </p>
      </div>

      <form
        onSubmit={handleChangePassword}
        className="glass-card max-w-2xl space-y-4"
      >
        <h2 className="text-h3 font-semibold text-text-primary">Change password</h2>
        <Input
          label="New password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="primary" size="md" loading={saving}>
          Update password
        </Button>
      </form>

      <div className="glass-card max-w-2xl space-y-4">
        <h2 className="text-h3 font-semibold text-text-primary">Sessions</h2>
        <p className="text-small text-text-secondary">
          Sign out from all devices where you&apos;re currently logged in.
        </p>
        <Button variant="secondary" size="md" onClick={handleLogoutAll}>
          Logout from all sessions
        </Button>
      </div>

      <form
        onSubmit={handleDeleteAccount}
        className="glass-card max-w-2xl space-y-4 border-semantic-danger/40 border"
      >
        <h2 className="text-h3 font-semibold text-semantic-danger">Delete account</h2>
        <p className="text-small text-text-secondary">
          This action cannot be undone. All your projects and data will be permanently
          removed.
        </p>
        <Button type="submit" variant="danger" size="md">
          Delete account
        </Button>
      </form>
    </div>
  );
}

