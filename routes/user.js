
let query = require('../utils/query.js');
let sql = require('../utils/sql.js');
let tokenTool = require('../utils/jwt.js');

let getUsers = async (ctx, next) => {
  let user = await query(sql.QUERY_TABLE('personalinfo')).then(res => {
    return {
      code: 0,
      data: res
    };
  }).catch(res => {
    ctx.response.body = res;
    return {
      code: 1,
      data: res
    };
  })
  // ctx.response.body = 'hello world'
  ctx.response.body = user;
}

// let addUsers = async (ctx, next) => {
//   let requestData = ctx.request.body;

//   let data = await query(sql.INSERT_TABLE_COMMON('personalinfo',requestData), Object.values(requestData)).then(res => {
//     return {
//       code: 0,
//       data: res
//     }
//   }).catch(res => {
//     return {
//       code: 1,
//       data: res
//     }
//   })
//   ctx.response.body = data;
// }

let addUsers = async (ctx, next) => {
  let requestData = ctx.request.body;

  let data = await query(sql.INSERT_TABLE('personalinfo', requestData));
  ctx.response.body = data;
}



let login = async (ctx, next) => {
  let requestData = ctx.request.body;
  console.log(requestData, 9999999)
  let { name, password } = requestData;
  if (name === 'L001' && password === '123456') {
    let token = tokenTool.generationToken({ name, password })
    // 若有token的情况
    if (token) {
      ctx.response.body = {
        code: 0,
        data: {
          token,
          name,
          password
        },
        message: ''
      }
    } else {
      ctx.response.body = {
        code: 1,
        data: null,
        message: '登录失败'
      }
    }
  } else {
    ctx.response.body = {
      code: 1,
      data: null,
      message: '账号与密码不匹配'
    }
  }
}

module.exports = {
  'GET /api/getUsers': getUsers,
  'POST /api/addUsers': addUsers,
  'POST /api/login': login
}