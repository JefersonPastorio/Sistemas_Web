const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {type: String, require: true, unique: true},
    senha: {type: String, require: true}
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;