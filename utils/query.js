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
      code: 0,
      data: res
    }
  }).catch(err => {
    return {
      success: false,
      code: 1,
      data: err
    }
  })
}

// module.exports = {
//   query
// }

module.exports = query;