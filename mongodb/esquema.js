const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome:{
      type: String,
      required: true
    },
    idade:{
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  })
  
  const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;