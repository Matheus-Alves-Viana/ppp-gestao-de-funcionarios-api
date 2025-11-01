const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../service/service');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

function somenteGerente(req, res, next) {
  if (req.user.role !== 'gerente') return res.status(403).json({ message: 'Acesso restrito a gerentes' });
  next();
}

function somenteFuncionario(req, res, next) {
  if (req.user.role !== 'funcionario') return res.status(403).json({ message: 'Acesso restrito a funcionários' });
  next();
}

module.exports = { autenticarToken, somenteGerente, somenteFuncionario };
