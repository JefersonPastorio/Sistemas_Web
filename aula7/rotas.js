const express = require('express');
const {check} = require ('express-validator');
const {registrarUsuario, loginUsuario} = require('./usuarioControlador');
const verificarToken = require('./middlewareAutorização');
const {renovarToken} = require('./usuarioControlador');

const rotas = express.Router();

rotas.post('/registrar', [
    check('nome').not().isEmpty().withMessage('Nome é obrigatorio'),
    check('senha').isLength({min: 6}).withMessage('A senha deve conter no mínimo 6 caracteres')
], registrarUsuario);

rotas.post('/login', [
    check('nome').not().isEmpty().withMessage('O nome é obrigatório'),
    check('senha').not().isEmpty().withMessage('A senha é obrigatória')
], loginUsuario);

rotas.get('/dadosProtegidos', verificarToken, (req,res) => {
    res.json({message: 'Você tem acesso a essa rota protegida!', usuario: req.usuario});
});

rotas.post('/renovarToken', renovarToken);

module.exports = rotas;