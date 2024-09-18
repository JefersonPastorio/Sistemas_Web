require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rotas = require('./rotas');

const app = express();
const porta = process.env.PORTA;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao mongoDB: \n', err));

app.use('/api', rotas); 

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
})
