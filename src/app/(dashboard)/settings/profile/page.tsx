'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/elements/Button';
import { Input } from '@/components/elements/Input';

interface ProfileForm {
  full_name: string;
  email: string;
  role: string;
  timezone: string;
  avatar_url: string;
}

export default function ProfileSettingsPage() {
  const [form, setForm] = useState<ProfileForm>({
    full_name: '',
    email: '',
    role: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    avatar_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const loadProfile = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    setForm((prev) => ({
      full_name: profile?.full_name || '',
      email: user.email || '',
      role: profile?.role || '',
      timezone: profile?.timezone || prev.timezone,
      avatar_url: profile?.avatar_url || '',
    }));
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const updates = {
        id: user.id,
        full_name: form.full_name,
        role: form.role,
        timezone: form.timezone,
        avatar_url: form.avatar_url || null,
      };

      await supabase.from('profiles').upsert(updates);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Profile</h1>
        <p className="text-body text-text-secondary">
          Manage your personal information used across Project Intelligence.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="glass-card space-y-6 max-w-2xl"
      >
        <div className="flex items-center gap-4">
          {form.avatar_url ? (
            <Image
              src={form.avatar_url}
              alt={form.full_name || 'Avatar'}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover border border-white/10"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl">
              {form.full_name ? form.full_name[0]?.toUpperCase() : 'U'}
            </div>
          )}
          <div>
            <p className="text-small text-text-muted mb-1">Avatar</p>
            <p className="text-tiny text-text-secondary mb-2">
              Upload an image to personalize your profile.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadingAvatar(true);
                try {
                  const supabase = createClient();
                  const {
                    data: { user },
                  } = await supabase.auth.getUser();
                  if (!user) return;

                  const filePath = `${user.id}/${Date.now()}-${file.name}`;
                  const { error } = await supabase.storage
                    .from('avatars')
                    .upload(filePath, file, { upsert: true });
                  if (error) throw error;

                  const { data } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(filePath);

                  const url = data.publicUrl;
                  setForm((f) => ({ ...f, avatar_url: url }));

                  await supabase
                    .from('profiles')
                    .update({ avatar_url: url })
                    .eq('id', user.id);
                } catch (err) {
                  console.error('Avatar upload error', err);
                } finally {
                  setUploadingAvatar(false);
                }
              }}
              className="text-tiny text-text-secondary file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:text-tiny file:text-text-primary"
            />
            {uploadingAvatar && (
              <p className="text-tiny text-text-muted mt-1">Uploading...</p>
            )}
          </div>
        </div>

        <Input
          label="Name"
          value={form.full_name}
          onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
        />

        <Input
          label="Email"
          value={form.email}
          disabled
          hint="Email comes from your login provider."
        />

        <Input
          label="Role"
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          placeholder="e.g. Engineering Manager"
        />

        <div>
          <label className="block text-small font-medium text-text-primary mb-2">
            Timezone
          </label>
          <select
            value={form.timezone}
            onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
            className="input-base"
          >
            <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </option>
            <option value="UTC">UTC</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Europe/Berlin">Europe/Berlin</option>
            <option value="Europe/Moscow">Europe/Moscow</option>
            <option value="Asia/Dubai">Asia/Dubai</option>
            <option value="Asia/Singapore">Asia/Singapore</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
            <option value="America/New_York">America/New_York</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
          </select>
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" size="md" loading={saving}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

