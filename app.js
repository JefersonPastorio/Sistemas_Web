// Importar Módulos
const http = require('http'); 
const digaOla = require('./bemvindo')

// Criar constantes e variaveis

const porta = 3000;
const endereco = '127.0.0.1';

const servidor = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plai; charset=utf-8');
    res.end(digaOla (' FTEC!'));   

});

servidor.listen(porta, endereco, () => {
    console.log(`Servidor rodando em http://${endereco}:${porta}`);
});
