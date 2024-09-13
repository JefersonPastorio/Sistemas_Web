const suricato = require('mongoose');

const usuarioSchema = new suricato.Schema({
    nome: {type: String, required: true},
    idade: {type: Number, min: [0, 'A idade não pode ser negativa.']},
    email: {type: String, required: true, unique: true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email iválido']}
});
// Expressão regular
// /.../ validação ocorre nos pontos
// . qquer caracteres
// .+ qquer caracteres mais de uma vez
// \@ significa o @


usuarioSchema.pre('save', function(next) {
    console.log('Começando a salvar o usuário: ', this.nome);
    next();
});

usuarioSchema.post('save', function() {
    console.log(`Usuário ${this.nome} salvo com sucesso!`);
});

const Usuario = suricato.model('Usuário', usuarioSchema);

suricato.connect('mongodb://localhost:27017/aula5')
    .then(() => console.log('Conectado com ao Banco de dados com sucesso!'))
    .catch(err => console.err('Erro ao conectat ao banco de dados: '));

const usuarioValido = new Usuario({nome: "Marcelo", idade: 30, email:"marceaalo@esmail.com"});
const usuarioInvalido = new Usuario({nome: "Maria", idade: 5, email:"joanaça@sha.fsas%s"});

usuarioValido.save()
    .then(result => console.log('Processo encerrado!'))
    .catch(err => {
        console.error(`Erro ao salvar o usuário ${usuarioValido.nome}`);
        if (err.name === 'ValidationError'){
            for(let field in err.errors){
                console.error(`${field}: ${err.errors[field].message}`)
            }
        }
    });

    usuarioInvalido.save()
    .then(result => console.log('Processo encerrado!'))
    .catch(err => {
        console.error(`Erro ao salvar o usuário ${usuarioInvalido.nome}`);
        if (err.name === 'ValidationError'){
            for(let field in err.errors){
                console.error(`${field}: ${err.errors[field].message}`)
            }
        }else {
            console.error('Erro ao salvar usuário:' , err);
        }   
    });