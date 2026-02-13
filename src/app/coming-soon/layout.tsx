import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon | OpenClaw Mac - Own Your AI Forever',
  description: 'Pre-order your OpenClaw Mac - a personal AI that runs entirely on your Mac. No cloud, no subscriptions, no compromises. Coming Q2 2026.',
  keywords: ['OpenClaw', 'Mac mini', 'AI', 'local AI', 'Apple Silicon', 'personal assistant', 'pre-order', 'coming soon'],
  openGraph: {
    title: 'Own Your AI. Forever. | OpenClaw Mac',
    description: 'A personal AI that runs entirely on your Mac. No cloud. No subscriptions. No compromises. Coming Q2 2026.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Own Your AI. Forever. | OpenClaw Mac',
    description: 'A personal AI that runs entirely on your Mac. No cloud. No subscriptions. No compromises. Coming Q2 2026.',
  },
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout doesn't include the standard Header/Footer
  // The coming-soon page has its own dark-themed header/footer
  return <>{children}</>;
}
