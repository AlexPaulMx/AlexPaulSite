-- Create supporters table
CREATE TABLE IF NOT EXISTS public.supporters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    display_name TEXT NOT NULL,
    address TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS supporters_created_at_idx ON public.supporters(created_at DESC);
CREATE INDEX IF NOT EXISTS supporters_amount_idx ON public.supporters(amount DESC);

-- Add RLS policies
ALTER TABLE public.supporters ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read supporters
CREATE POLICY "Allow public read access" ON public.supporters
    FOR SELECT
    USING (true);

-- Allow authenticated users to insert their own support
CREATE POLICY "Allow authenticated users to insert" ON public.supporters
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.supporters
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at(); 