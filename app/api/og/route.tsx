import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #18181b 60%, #23272f 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="https://localhost:3000/images/logo-alexpaul.png"
          width={400}
          height={400}
          style={{ borderRadius: '32px', background: '#18181b', padding: '40px' }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 