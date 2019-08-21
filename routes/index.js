// 把routes文件夹的js导出的放到router的地址上 然后return router.routes()
// https://www.jianshu.com/p/4a8654b69576
// router.routes()
// 先获取js文件导出的内容
const fs = require('fs');
const path = require('path');

// 获取js文件
function addRouters(router, dir) {
  var files = fs.readdirSync(path.resolve(__dirname));

  var js_files = files.filter((f) => {

    return f.endsWith('.js') && !f.includes('index.js');
  })
  for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    let mapping = require(path.resolve(__dirname, f));
    addMapping(router, mapping)
  }
}

// 获取module.exports内容
function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5);
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`);
    }
    else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

module.exports = function (dir) {
  let router_dir = dir || 'routes',
    router = require('koa-router')();
  addRouters(router, router_dir);
  return router.routes();
}

