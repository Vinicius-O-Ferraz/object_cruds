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

// consultarVeiculos();


/*
    Casos de teste para inserir pallets com diferentes tipos de pallet e consultar os pallets inseridos.
*/

async function consultarCaixasporPallet(pallet_id) {
    const { data, error } = await supabase
        .from('caixa')
        .select('*')
        .eq('pallet_id', pallet_id);

        if (error) {
        console.error('Erro ao consultar PALLET:', error);
        return;
    }
        console.table(data);
}

async function consultarPallets() {
    const { data, error } = await supabase
        .from('pallet')
        .select('*');

    if (error) {
        console.error('Erro ao consultar PALLETS:', error);
        return;
    }

    console.table(data);
}

async function inserirPallet(pallet_id, tipo_pallet) {
     const { data, error } = await supabase
        .from('pallet')
        .insert({
            pallet_id: validarPallet(pallet_id),
            tipo_pallet: tipo_pallet
        })
        .select();


      if (error) {
        console.error('Erro ao inserir pallet:', error);
        return;
    }

    console.log('Pallet inserido com sucesso:');
    console.table(data);
}

function validarPallet(pallet_id, tipo_pallet) {

    if (typeof pallet_id !== 'string') {
        throw new Error('O pallet deve ser uma string.');
    }
   
    // Remove espaços no início e no final
    const palletNormalizado = pallet_id  
    .replace(/-/g, '')         
    .replace(/-/g, '')
    .replace(/\s/g, '')
    .trim();

    // Valida o tamanho
    const tamanhosValidos = [15];

    if (!tamanhosValidos.includes(palletNormalizado.length)) {
        throw new Error(
            `Pallet inválido: "${pallet_id}". ` +
            `O pallet deve possuir 15 caracteres após a remoção dos hífens.`
        );
    }

    const tiposValidos = ['PIC', 'PC', 'PFC'];

    if (!tiposValidos.includes(tipo_pallet)) {
        throw new Error(
            `Tipo de pallet inválido: "${tipo_pallet}". ` +
            `Os tipos válidos são: ${tiposValidos.join(', ')}.`
        );
    }

    return palletNormalizado;
}

// inserirPallet('200000000000001', 'PIC');
// inserirPallet('200000000000002', 'PIC');
// inserirPallet('20000000000000-3', 'PIC');
// inserirPallet('20000000000000 4', 'PIC');
// inserirPallet('200000000000005', 'PG');


// consultarPallets();

/*
    Métodos para consultar e inserir caixas na tabela 'caixa' do Supabase.
*/

async function consultarCaixas() {
    const { data, error } = await supabase
        .from('caixa')
        .select('*');

    if (error) {
        console.error('Erro ao consultar CAIXA:', error);
        return;
    }

    console.table(data);
}


async function inserirCaixa(caixa_id, tipo, pallet_id) {
     const { data, error } = await supabase
        .from('caixa')
        .insert({
            caixa_id: validarCaixa(caixa_id),
            tipo: tipo,
            pallet_id: pallet_id
        })
        .select();


      if (error) {
        console.error('Erro ao inserir caixa:', error);
        return;
    }

    console.log('Caixa inserida com sucesso:');
    console.table(data);
}

function validarCaixa(caixa_id) {

    if (typeof caixa_id !== 'string') {
        throw new Error('A caixa deve ser uma string.');
    }
   
    // Remove espaços no início e no final
    const caixaNormalizada = caixa_id  
    .replace(/-/g, '')         
    .replace(/-/g, '')
    .replace(/\s/g, '')
    .trim();

    // Valida o tamanho
    const tamanhosValidos = [15];

    if (!tamanhosValidos.includes(caixaNormalizada.length)) {
        throw new Error(
            `Caixa inválida: "${caixa_id}". ` +
            `A caixa deve possuir 15 caracteres após a remoção dos hífens.`
        );
    }

    return caixaNormalizada;
}

// inserirCaixa('100000000000001', 'PIC', '200000000000001');
// inserirCaixa('100000000000002', 'PIC', '200000000000001');
// inserirCaixa('10000000000000-3', 'PIC', '200000000000001');
// inserirCaixa('10000000000000 4', 'PIC', '200000000000001');

// consultarCaixas();

// consultarCaixasporPallet('200000000000001');

async function consultarRotas() {
    const { data, error } = await supabase
        .from('rota')
        .select('*');
}


async function consultarRota(id_rota) {
    const { data, error } = await supabase
        .from('rota')
        .select('*')
        .eq('id_rota', id_rota);
}

async function criarRota(id_rota, pontos) {

    const { data, error } = await supabase
        .from('rota')
        .insert({
            // id_rota: validarRota(id_rota)
            id_rota: id_rota,
            pontos: pontos
        })
        .select();

    if (error) {
        console.error('Erro ao criar rota:', error);
        return;
    }

    console.log('Rota criada com sucesso:');
    console.table(data);
}

async function removerRota(id_rota) {
    const { data, error } = await supabase
        .from('rota')
        .delete()
        .eq('id_rota', id_rota).select();
}



criarRota('ROTA001', ['PONTO1', 'PONTO2', 'PONTO3']);
consultarRota('ROTA001');
removerRota('ROTA001');
consultarRotas('ROTA001');