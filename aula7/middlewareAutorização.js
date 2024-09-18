const jwt = require('jsonwebtoken');
const segredo = process.env.JWT_SECRET;

const verificarToken = (req, res, proximo) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido!' });
  }
  jwt.verify(token, segredo, (erro, usuarioDecodificado) => {
    if (erro) {
      return res.status(500).json({ message: 'Falha ao verificar token!' });
    }
    req.usuario = usuarioDecodificado;
    proximo();
  });
};

module.exports = verificarToken;
