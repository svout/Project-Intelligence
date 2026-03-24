import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import AppProviders from './providers';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Project Intelligence | AI that understands your project',
  description:
    'Meetings, tasks and team communication analyzed in real time to detect blockers and delivery risks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${font.variable} font-sans ${font.className}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
