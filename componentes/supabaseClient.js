import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://rwnzuvbjnsgurupmuehb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bnp1dmJqbnNndXJ1cG11ZWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxMjg3MTgsImV4cCI6MTk4NDcwNDcxOH0.rrqxbuOdxn2nYXGyUWUIKtZakYsF2FmIhBSHT9xLqi4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
