import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);


async function consultarVeiculos() {
    const { data, error } = await supabase
        .from('veiculo')
        .select('*');

    if (error) {
        console.error('Erro ao consultar VEICULO:', error);
        return;
    }

    console.table(data);
}

async function inserirVeiculos(placa) {
     const { data, error } = await supabase
        .from('veiculo')
        .insert({
            placa: placa
        })
        .select();


      if (error) {
        console.error('Erro ao inserir veículo:', error);
        return;
    }

    console.log('Veículo inserido com sucesso:');
    console.table(data);
}




var placa = 'BCD1234';
inserirVeiculos(placa);

consultarVeiculos();
