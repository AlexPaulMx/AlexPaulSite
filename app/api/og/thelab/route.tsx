/** @jsxImportSource react */
import { ImageResponse } from '@vercel/og';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const runtime = 'edge';

export async function GET() {
  // Fetch current progress and top 10 collectors from Supabase
  const { data: progressData, error: progressError } = await supabase
    .from('donations')
    .select('amount')
    .order('created_at', { ascending: false })
    .limit(1);

  console.log('Progress Data:', progressData, 'Progress Error:', progressError);

  const { data: collectorsData, error: collectorsError } = await supabase
    .from('donations')
    .select('name')
    .order('amount', { ascending: false })
    .limit(10);

  console.log('Collectors Data:', collectorsData, 'Collectors Error:', collectorsError);

  if (progressError || collectorsError) {
    console.error('Error fetching data:', progressError || collectorsError);
    return new Response('Error fetching data', { status: 500 });
  }

  const totalAmount = progressData[0]?.amount || 0;
  const collectors = collectorsData.map((c: any) => c.name);

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
          {collectors.map((name: string, index: number) => (
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