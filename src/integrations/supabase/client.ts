// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yytunwhezparvofxkjds.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5dHVud2hlenBhcnZvZnhramRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2ODkzNjksImV4cCI6MjA1OTI2NTM2OX0.z3nTiKvWAp6wlsHj5kFlRXkjnf92yaJSwR5e7xUCcbA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);