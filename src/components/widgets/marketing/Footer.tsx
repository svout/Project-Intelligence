'use client';

import Link from 'next/link';
import GradientText from '@/components/elements/GradientText';

const links = [
  { label: 'Product', items: [{ href: '#features', label: 'Features' }, { href: '#pricing', label: 'Pricing' }, { href: '#', label: 'Integrations' }] },
  { label: 'Company', items: [{ href: '#', label: 'About' }, { href: '#', label: 'Blog' }, { href: '#', label: 'Contact' }] },
  { label: 'Legal', items: [{ href: '#', label: 'Privacy' }, { href: '#', label: 'Terms' }] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-content mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="text-lg font-bold text-text-primary">
              AI Project <GradientText>Intelligence</GradientText>
            </Link>
          </div>
          {links.map((col) => (
            <div key={col.label}>
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-4">{col.label}</p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-text-secondary hover:text-text-primary text-body transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border text-center text-text-muted text-body">
          © {new Date().getFullYear()} AI Project Intelligence. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
