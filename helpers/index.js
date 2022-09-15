const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPass = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
const comparePass = (pass, hash) => bcrypt.compareSync(pass, hash);
const signToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
const verifyToken = (token) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

module.exports = { hashPass, comparePass, signToken, verifyToken }