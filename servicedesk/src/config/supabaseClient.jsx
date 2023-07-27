
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tkucqzsdvfpsdgmebmjg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrdWNxenNkdmZwc2RnbWVibWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzOTAwMjksImV4cCI6MjAwNTk2NjAyOX0.B9_7Fik2rZ3pHOqJLTux1awOzXIMRekGsc_sHrqzTfc'

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase