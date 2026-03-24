'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/elements/Button';

type Theme = 'dark' | 'light' | 'system';

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let initial: Theme = 'dark';
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('theme_preference')
          .eq('id', user.id)
          .single();
        if (profile?.theme_preference) {
          initial = profile.theme_preference as Theme;
        }
      }
      const stored = (localStorage.getItem('pi-theme') as Theme | null) || initial;
      setTheme(stored);
      applyTheme(stored);
    })();
  }, []);

  async function handleChange(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  function applyTheme(value: Theme) {
    const root = document.documentElement;
    root.dataset.theme = value;
    localStorage.setItem('pi-theme', value);
  }

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
        .update({ theme_preference: theme })
        .eq('id', user.id);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary mb-2">Appearance</h1>
        <p className="text-body text-text-secondary">
          Control how Project Intelligence looks on your device.
        </p>
      </div>

      <div className="glass-card max-w-xl space-y-4">
        <p className="text-small text-text-muted">Theme</p>
        <div className="grid grid-cols-3 gap-4">
          {(['dark', 'light', 'system'] as Theme[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleChange(value)}
              className={`rounded-2xl border px-4 py-3 text-small font-medium capitalize transition-all ${
                theme === value
                  ? 'border-accent-indigo bg-accent-indigo/10 text-text-primary'
                  : 'border-white/10 bg-white/5 text-text-secondary hover:border-white/20'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="text-tiny text-text-muted">
          System will follow your OS preference. Light mode applies a brighter surface palette.
        </p>

        <div className="pt-2">
          <Button onClick={handleSave} variant="primary" size="md" loading={saving}>
            Save preference
          </Button>
        </div>
      </div>
    </div>
  );
}

