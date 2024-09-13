// Importação de pacotes e identificações
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Criação das contantes de trabalho
const app = express();
const porta = process.env.PORTA;
const Usuario = require('./modelos/Usuario');

// Conexão com o Banco de Dados (Mongoose)
mongoose.connect(process.env.URI_MONGO)
    .then(() => {
    console.log('Conectado ao mongoDB!');
})
.catch(err => {
    console.err('Erro ao concectar ao mongoDB!\n', err)
});

// Ativação do Middleware
app.use(express.json());

// Criação de rotas
// Estáticas
// CRUD
// Inclusao de usuário
app.post('/usuarios', async (req,res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (erro) {
        res.status(400).send(erro);
    }
});

// Consulta
app.get('/usuarios/:id', async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).send({message: "Usuário não encontrado!"});
        }
        res.status(200).send(usuario);
    } catch (erro) {
        res.status(500).send(erro);
    }
});

// Atualização
app.patch('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators:true});
            if (!usuario) {
                return res.status(404).send({message: "Usuário não encontrado!"});
            }
            res.send(usuario);
        } catch (erro) {
            res.status(400).send(erro);
        }
});

// Exclusão
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).send({message: "Usuário não encontrado"});
        }
        res.send(usuario);
    } catch (erro) {
        res.status(500).send(erro);
    }
});


// Ativar o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
});
