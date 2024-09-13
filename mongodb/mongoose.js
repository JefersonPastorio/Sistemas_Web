const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/aula5')
    .then(() => console.log('Conectado ao MongoDB!'))
    .catch(err => console.log('Erro ao conectar ao MongoDB:\n',));

// Definindo esquema
// -------------------
const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    idade: {type: Number, min:0},
    email: {type: String, required: true, unique: true},
    foto: {type: Buffer, required: false}
});

// Tipo de dados: Date, Boolean, Array, Buffer, Mixed, ObjectId

// Criando metódo 
usuarioSchema.statics.findByEmail = function(email){
    return this.findOne({email});
}

// Metódo de instância 
usuarioSchema.methods.saudar = function(){
    return `Olá, meu nome é ${this.nome}`;
};

// Definindo o modelo
// -------------------
const Usuario = mongoose.model('Usuario', usuarioSchema);


// Usuario.findByEmail('joao@email.com').then(usuario => console.log(usuario));
const usuario = new Usuario({nome: "Pastorio", idade: 33});
console.log(usuario.saudar());

// Gravando Imagem no banco
// -------------------
// fs.readFile(path.join(__dirname, 'imgs', 'suricato.png'), (err, data) => {
//     if (err) throw err;
//     const novoUsuario = new Usuario({
//         nome: 'Jeferson',
//         email: 'Não vou dizer',
//         foto: data
//     });
//     novoUsuario.save().then(() => console.log('Usuário salvo com sucesso!'));
// })

// Buscando imagem no banco
// ---------------------------
// Usuario.findById('66e2fcb6c14bfb871bd09479')
//     .then(usuario => {
//         if (!usuario) {
//             throw new error (' Usuário não encontrado!');
//         }
//         fs.writeFile('foto_suricato.png', usuario.foto,
//             (err) => {
//                 console.log('Imagem recuperada e salva com sucesso');
//             });
//     })
//     .catch(err => console.error('Erro ao recuperar ou salvar a imagem: \n', err));


// Segundo exemplo
// -----------------
// const esquemaDinamico = new Schema({}, {strict:false});

// const modeloDinamico = mongoose.model('modeloDinamico', esquemaDinamico);

// const doc4 = new modeloDinamico({campo1: "Texto", campo2: 123, campo3: {subcampo:"valor"}});
// doc4.save();

// Primeiro exemplo
// ----------------------
// const qquerSchema = new Schema({
//     qualquerCoisa: Schema.Types.Mixed
// });
// const qquerModelo = mongoose.model('qquerModelo', qquerSchema);
// const doc1 = new qquerModelo({qualquerCoisa: "Texto Simples"});
// const doc2 = new qquerModelo({qualquerCoisa: {nome: "Jeferson", idade: 33}});
// const doc3 = new qquerModelo({qualquerCoisa: [1, 2, 3, 4, 5]});
// doc1.save();
// doc2.save();
// doc3.save();
