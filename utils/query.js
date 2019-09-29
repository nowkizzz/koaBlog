const mysql = require('mysql');
const config = require('../config/mysqlConfig.js');
const pool = mysql.createPool(config);


let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  }).then(res => {
    return {
      success: true,
      code: res.code,
      data: res
    }
  }).catch(err => {
    console.log('====================================');
    console.log('错误返回', err);
    console.log('====================================');
    return {
      success: false,
      code: 400,
      data: err
    }
  })
}

// module.exports = {
//   query
// }

module.exports = query;