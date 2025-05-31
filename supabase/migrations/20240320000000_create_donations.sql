-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous reads
CREATE POLICY "Allow anonymous reads" ON public.donations
    FOR SELECT
    TO anon
    USING (true);

-- Create policy to allow authenticated inserts
CREATE POLICY "Allow authenticated inserts" ON public.donations
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS donations_created_at_idx ON public.donations(created_at DESC);
CREATE INDEX IF NOT EXISTS donations_amount_idx ON public.donations(amount DESC); 