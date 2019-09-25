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
 *  查询相应的数据
 * @params options
 * @params tableName  数据表
 * @params selectQuery 选择的数据数组
 * */ 
const SELECT_PARAMS_TABLE = (options) => {
  let params = '*'
  if (Array.isArray(options.selectQuery)) {
    params = options.selectQuery.join(',')
  }
  let pageIndex = options.pageIndex || 1;
  let pageSize = options.pageSize || 10
  return `SELECT COUNT(*) FROM ${options.tableName};SELECT ${params} FROM ${options.tableName} limit ${(pageIndex - 1) * pageSize},${pageIndex*pageSize};`
}

// 插入数据 使用, , 用法
const INSERT_TABLE_COMMON = (tableName, obj) => {
  let keys = [], vals = [];
  for (let [k,v] of Object.entries(obj)) {
    keys.push(k);
    vals.push('?')
  }
  let key = keys.join(',');
  let val = vals.join(',');
  console.log(`INSERT INTO ${tableName}(${key}) VALUES (${val})`);
  return `INSERT INTO ${tableName}(${key}) VALUES (${val})`
}


// 插入数据
const INSERT_TABLE = (tableName, obj) => {
  let keys = [], vals = [];
  for (let [k,v] of Object.entries(obj)) {
    keys.push(k);
    vals.push("'" + v + "'")
  }
  let key = keys.join(',');
  let val = vals.join(',');
  console.log(`INSERT INTO ${tableName}(${key}) VALUES (${val})`);
  return `INSERT INTO ${tableName}(${key}) VALUES (${val})`
}

// 更新数据
const UPDATE_TABLE = (tableName, {primaryKey, primaryVal}, {key, value}) => `UPDATE ${tableName} SET ${key}=${val} WHERE(${primaryKey}=${primaryVal});`


// 删除数据
const DELETE_TABLE = (tableName, {primaryKey, primaryVal}) => `DELETE FROM ${tableName} WHERE(${primaryKey}=${primaryVal});`

module.exports = {
  CREATE_TABLE,
  QUERY_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE,
  INSERT_TABLE_COMMON,
  SELECT_PARAMS_TABLE
}