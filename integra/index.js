// GET, POST, PUT, PATCH e DELETE
// JSON ou XML

// Construindo as constantes da aplicação
const express = require('express'); // 
const mongoose = require ('mongoose');
require('dotenv').config();

// Criação da aplicação Express
const app = express();

// Importando variaveis do ambiente
const porta = process.env.PORTA;
const senha = process.env.SECRET_KEY;

// Conectando com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado ao mongoDB!');
        console.log(`A senha e: ${senha}`);
    })
    .catch(err => {
        console.err('Erro ao concectar ao mongoDB!\n', err)
    });

// Middleware para trduzir o Json
app.use(express.json());

// Definir modelo básico de recurso
const Usuario = mongoose.model('Usuario ', new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true}
}));

// Rotas CRUD
// Criação
app.post('/usuarios', async (req,res) => {
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
 });

// Leitura
app.get('/usuario', async (req, res) => {
    try{
        const usuarios = await Usuario.find({});
        res.status(200).send(usuarios); 
    } catch (error) {
        res.status(500).send(error);
    }
});

// Atualização
app.patch('/usuarios/:id', async (req,res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body, {new: true, runValidators: true});
        if (!usuario) {
            return res.status(404).send();
        }
        res.send(usuario);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Exclusão
app.delete('/usuarios/:id', async (req, res) => {
    try {
      const usuario = await Usuario.findByIdAndDelete(req.params.id);
      if (!usuario) {
        return res.status(404).send();
      }
      res.send(usuario);  
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Definindo a execução da aplicação
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`)
});