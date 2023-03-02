// Função assíncrona
async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('cep');
    try {
        // Consumindo API
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        
        // throw erro
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        // criando variáveis
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');
        var estado = document.getElementById('estado');

        // auto-completando os valores
        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;
        estado.value = consultaCEPConvertida.uf;

        // console no valor .json
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
        
    // catch erro
    } catch (erro) {
        mensagemErro.value = `CEP inválido!`;
        console.log(erro)
    }
}

// manipulando DOM e criando gatilho 
var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));


// Stringifying vários ceps  

// let ceps = ['01001000', '01001001'];
// let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));

// Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

