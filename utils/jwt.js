const jwt = require('jsonwebtoken');
// 密钥
const cert = 'arsenal'
// 生成token期限
const expiresIn = 60 * 5;

// 生成jwt => token
let generationToken = function (data) {
  // 头部 内容 签名
  return jwt.sign(data, cert, {
    expiresIn
  })
}

// 解析token
let decodeToken = function (token) {
  return jwt.decode(token)
}

// 验证token
let verifyToken = function (token) {
  return jwt.verify(token, cert)
}


module.exports = {
  generationToken,
  verifyToken,
  decodeToken
}