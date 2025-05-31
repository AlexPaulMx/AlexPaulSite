/** @jsxImportSource react */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  // Static data for now
  const totalAmount = 0;
  const collectors = ['Coming soon...'];

  // Generate the OG image
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1200px',
          height: '630px',
          backgroundColor: 'white',
          padding: '40px',
        }}
      >
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>The Lab Crowdfund</h1>
        <p style={{ fontSize: '36px', marginBottom: '20px' }}>Total Raised: ${totalAmount}</p>
        <div
          style={{
            width: '100%',
            height: '40px',
            backgroundColor: '#e0e0e0',
            borderRadius: '20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: `${(totalAmount / 10000) * 100}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              borderRadius: '20px',
            }}
          />
        </div>
        <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Top 10 Collectors:</h2>
        <ul style={{ fontSize: '24px', listStyle: 'none', padding: 0 }}>
          {collectors.map((name, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>{name}</li>
          ))}
        </ul>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
} 