import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.SB_BASE_URL || '';
const supabaseKey = process.env.SB_SERVICE_KEY || '';
const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
