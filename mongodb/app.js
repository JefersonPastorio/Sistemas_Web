const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Usuario = require('./esquema');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { error } = require('console');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/formulario', (req,res) => {
    res.render('formulario');
});

app.post('/salvar', async (req, res ) => {
  try {
    const {nome, idade, email} = req.body;
    const novoUsuario = new Usuario({nome, idade, email}); 
    await novoUsuario.save()
    res.send('Usuário salvo com sucesso!')
  } catch (err) {
    console.error('Erro ao salvar novo usuário!\n', err);
    res.status(500).send('Erro ao salvar o novo usuário!');
  }
});

// Conectando o mongoDB

mongoose.connect('mongodb://localhost:27017/aula4')
.then(() => console.log('Conectado MongoDB com sucesso!'))
.catch(err => console.err('Erro ao conectar com o MongoDB', err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
