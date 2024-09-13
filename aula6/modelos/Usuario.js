const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    idade: {type: Number, min: [0, 'A idade não pode ser negativa!']}
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;