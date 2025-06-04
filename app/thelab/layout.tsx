import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Lab - AlexPaul',
  description: 'Support The Lab, an audiovisual album by AlexPaul. Join the community and get exclusive rewards.',
  openGraph: {
    title: 'The Lab - AlexPaul',
    description: 'Support The Lab, an audiovisual album by AlexPaul. Join the community and get exclusive rewards.',
    images: [
      {
        url: 'https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4',
        width: 1200,
        height: 630,
        alt: 'The Lab - AlexPaul',
      }
    ],
    type: 'website',
    siteName: 'The Lab - AlexPaul',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Lab - AlexPaul',
    description: 'Support The Lab, an audiovisual album by AlexPaul. Join the community and get exclusive rewards.',
    images: ['https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4'],
    creator: '@alexpaulmusic',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://jade-tropical-puma-660.mypinata.cloud/ipfs/bafybeiejsacb6bqh3nkrcidhrxvh2m3uzepuc6omqgogpuq66ttb4urxc4',
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