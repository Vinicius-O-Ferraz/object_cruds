import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

/*
    Métodos para consultar e inserir veículos na tabela 'veiculo' do Supabase.
*/

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

function validarPlaca(placa) {

    if (typeof placa !== 'string') {
        throw new Error('A placa deve ser uma string.');
    }

    // Remove todos os hífens
    const placaLimpa = placa.replace(/-/g, '')
   
    // Remove espaços no início e no final
    const placaNormalizada = placa
    .replace(/-/g, '')
    .replace(/\s/g, '')
    .trim();

    // Valida o tamanho
    const tamanhosValidos = [7, 8, 11];

    if (!tamanhosValidos.includes(placaNormalizada.length)) {
        throw new Error(
            `Placa inválida: "${placa}". ` +
            `A placa deve possuir 7, 8 ou 11 caracteres após a remoção dos hífens.`
        );
    }

    return placaNormalizada;
}

async function inserirVeiculos(placa) {
     const { data, error } = await supabase
        .from('veiculo')
        .insert({
            placa: validarPlaca(placa)
        })
        .select();


      if (error) {
        console.error('Erro ao inserir veículo:', error);
        return;
    }

    console.log('Veículo inserido com sucesso:');
    console.table(data);
}

async function formatarVeiculos(placa) {

}

/*
    Casos de teste para inserir veículos com diferentes formatos de placa e consultar os veículos inseridos.
*/


// var placa = 'BCD1235';
// inserirVeiculos(placa);

// var placa = 'ABA1235';
// inserirVeiculos(placa);

// var placa = 'BABA1235';
// inserirVeiculos(placa);

// var placa = 'MSCU-123456-9';
// inserirVeiculos(placa);

// var placa = 'BCD-1234';
// inserirVeiculos(placa);

// var placa = 'ABA-1234';
// inserirVeiculos(placa);

// var placa = 'BABA-1234';
// inserirVeiculos(placa);

// var placa = 'MSCU 123456 8';
// inserirVeiculos(placa);



consultarVeiculos();
