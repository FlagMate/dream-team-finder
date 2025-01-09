import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://aamfgftaxyduggjwqdgj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbWZnZnRheHlkdWdnandxZGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNDc4MTAsImV4cCI6MjA1MDcyMzgxMH0.PtecjWdfkEt_dmyZTky1HcslOAdclmGn6Gi-l0EdlJ4";

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);