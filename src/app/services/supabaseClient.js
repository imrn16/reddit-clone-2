import {createClient} from '@supabase/supabase.js'

const supabaseURL = process.env.NEXT_PUBLIC_SUBABASE_URL;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUBABASE_ANON_KEY

export const supabase = createClient(supabaseURL, supabaseAnonKey)