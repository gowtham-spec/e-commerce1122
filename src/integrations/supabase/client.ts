// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fvofocsvzkbbypkacjnz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2b2ZvY3N2emtiYnlwa2Fjam56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTg1NTgsImV4cCI6MjA1ODk5NDU1OH0.CnhViGmdAFrmf_08mggY8mAU6Ihvi9xRRDWB3bFy_Vk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);