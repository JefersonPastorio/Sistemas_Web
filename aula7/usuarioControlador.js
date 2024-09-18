const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const Usuario = require('./modeloUsuario');

const segredo =  process.env.JWT_SECRET;
const segredoRenovacao = process.env.JWT_REFRESH_SECRET;

const gerarTokens = (usuario) => {
    const accessToken = jwt.sign({nome: usuario.nome}, segredo, {expiresIn: '1h'});
    const refreshToken = jwt.sign({nome: usuario.nome}, segredoRenovacao, {expiresIn: '7d'});
    return {accessToken, refreshToken};
};

const registrarUsuario = async (req,res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array() });
    }
    const {nome, senha} = req.body;

    try {
        const senhaCriptografada = bcrypt.hashSync(senha, 10);
        const novoUsuario = new Usuario({nome,senha: senhaCriptografada});
        await novoUsuario.save();

        res.status(201).json({message: 'Usuário criado com sucesso!'})
    }catch(erro) {
        res.status(500).json({message: 'Erro ao registrar o usuário \n', erro});
    }
};

const loginUsuario = async (req,res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array() });
    }
    const {nome, senha} = req.body;
    try {
        const usuario = await Usuario.findOne({nome});
        if (!usuario) {
            return res.status(404).json({message: 'Usuário não localizado!'});
        }
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({message: 'Senha incorreta!'});
        }
        const tokens = gerarTokens(usuario);
        res.json({tokens});
    } catch (erro){
        res.status(500).json({message: 'Erro ao fazer login \n', erro});
    }
};

const renovarToken = (req, res) => {
    const {refreshToken} = req.body;
    if (!refreshToken) {
        return res.status(403).json({message: 'Token de renovação não fornecida!'});
    }
    jwt.verify(refreshToken, segredoRenovacao, (erro,usuario) => {
        if (erro) {
            return res.status(403).json({message: 'Token de renovação inválida!'});
        }
        const novoAccessToken = jwt.sign({nome: usuario.nome}, segredo, {expiresIn: '1h'});
        res.json({accessToken: novoAccessToken});
    });
}

module.exports = {registrarUsuario, loginUsuario, renovarToken};