import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozctwxtnhagwctockxlz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Y3R3eHRuaGFnd2N0b2NreGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODE1MzAsImV4cCI6MjA2MzQ1NzUzMH0.JXd72AP9H-_jfjqE4Ze-jOJDsCZ4QlS2IWmV1b4niVs';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 