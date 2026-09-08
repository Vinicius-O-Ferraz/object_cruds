import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; // Carrega automaticamente as variáveis do .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validação simples para evitar erros em execução
if (!supabaseUrl || !supabaseKey) {
  throw new Error('As variáveis SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias.');
}

// Instancia o cliente global
export const supabase = createClient(supabaseUrl, supabaseKey);