-- Create supporters table
CREATE TABLE supporters (
  id BIGSERIAL PRIMARY KEY,
  address TEXT NOT NULL,
  display_name TEXT NOT NULL,
  comment TEXT,
  amount DECIMAL NOT NULL,
  currency TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on address for faster lookups
CREATE INDEX supporters_address_idx ON supporters(address);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_supporters_updated_at
  BEFORE UPDATE ON supporters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read supporters
CREATE POLICY "Allow public read access"
  ON supporters
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert their own supporters
CREATE POLICY "Allow authenticated users to insert"
  ON supporters
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL); 