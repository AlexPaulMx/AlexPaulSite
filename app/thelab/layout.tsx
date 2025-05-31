import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Lab - AlexPaul',
  description: 'Support The Lab, an audiovisual album by AlexPaul',
  openGraph: {
    title: 'The Lab - AlexPaul',
    description: 'Support The Lab, an audiovisual album by AlexPaul',
    images: ['/images/thelab-logo.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/images/thelab-logo.png',
    'fc:frame:button:1': 'Support Project',
    'fc:frame:button:2': 'View Rewards',
    'fc:frame:post_url': 'https://your-domain.com/api/farcaster',
  },
};

export default function TheLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
} 