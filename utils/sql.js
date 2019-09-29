const query = require('./query.js')
// 创建数据库
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS posts(
  id INT(15) NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  createTime DATE,
  content LONGTEXT,
  PRIMARY KEY(id) 
);`.replace(/[\r\n]/g, '')

// 查询数据表
const QUERY_TABLE = (tableName) => `SELECT * FROM ${tableName};`

/** 
 *  查询相应的数据列表
 * @params options
 * @params tableName  数据表
 * @params selectQuery 选择的数据数组
 * */
const SELECT_List_TABLE = (options) => {
  let params = '*'
  if (Array.isArray(options.selectQuery)) {
    params = options.selectQuery.join(',')
  }
  let pageIndex = options.pageIndex || 1;
  let pageSize = options.pageSize || 10
  // ORDER BY Company DESC 或ASC
  return query(`SELECT COUNT(*) FROM ${options.tableName};SELECT ${params} FROM ${options.tableName} limit ${(pageIndex - 1) * pageSize},${pageIndex * pageSize};`)
}

// 
/**
 * 查询数据详情
 * @params options
 * @params tableName 数据表
 * @params 选择的数据 
 *  */
const SELECT_ITEM_TABLE = (tableName, obj) => {
  let keys = '', vals = '';
  for (let k in queryObj) {
    keys = k;
    vals = obj[k]
  }
  return query(`SELECT * FROM ${tableName} WHERE ${keys}=${vals}`)
}

// 插入数据 使用, , 用法  后面需要加参数
const INSERT_TABLE_COMMON = (tableName, obj) => {
  let keys = [], vals = [];
  for (let [k, v] of Object.entries(obj)) {
    keys.push(k);
    vals.push('?')
  }
  let key = keys.join(',');
  let val = vals.join(',');
  console.log(`INSERT INTO ${tableName}(${key}) VALUES (${val})`);
  return query(`INSERT INTO ${tableName}(${key}) VALUES (${val})`, vals);
}


// 插入数据
const INSERT_TABLE = (tableName, obj) => {
  let keys = [], vals = [];
  for (let [k, v] of Object.entries(obj)) {
    keys.push(k);
    vals.push("'" + v + "'")
  }
  let key = keys.join(',');
  let val = vals.join(',');
  console.log(`INSERT INTO ${tableName}(${key}) VALUES (${val})`);
  return query(`INSERT INTO ${tableName}(${key}) VALUES (${val})`);
}

// 更新数据 单个
const UPDATE_TABLE = (tableName, { primaryKey, primaryVal }, { key, value }) => `UPDATE ${tableName} SET ${key}=${val} WHERE(${primaryKey}=${primaryVal});`

// 更新多个数据
const UPDATE_TABLE_MORE = (tableName, { primaryKey, primaryVal }, setObj) => {
  let keys = [], vals = [];
  for (let [k, v] of Object.entries(setObj)) {
    keys.push(k + '=?')
    vals.push(v)
  }
  let key = keys.join(',')
  let sql = `UPDATE ${tableName} SET ${key} where ${primaryKey}=${primaryVal}`
  return query(sql, vals);
}

// 删除数据
const DELETE_TABLE = (tableName, queryObj) => {
  let keys = '', vals = [];
  for (let k in queryObj) {
    keys = k;
    vals.push(k[v])
  }
  let val = vals.join(',')
  return query(`DELETE FROM ${tableName} WHERE(${keys}=${val});`)
}

module.exports = {
  CREATE_TABLE,
  QUERY_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE,
  INSERT_TABLE_COMMON,
  SELECT_PARAMS_TABLE,
  UPDATE_TABLE_MORE,
  SELECT_ITEM_TABLE
}