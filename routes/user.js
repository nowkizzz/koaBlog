
let query = require('../utils/query.js');
let sql = require('../utils/sql.js');
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

  let data = await query(sql.INSERT_TABLE('personalinfo',requestData));
  ctx.response.body = data;
}

module.exports = {
  'GET /api/getUsers': getUsers,
  'POST /api/addUsers': addUsers
}