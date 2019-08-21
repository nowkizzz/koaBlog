// const fs = require('fs');
// const path = require('path');

const compose = require('koa-compose')
const glob = require('glob');
const { resolve } = require('path')

registerRouter = () => {
  let routers = [];
  glob.sync(resolve(__dirname, './', '**.js'))
    .filter(value => (value.indexOf('index.js') === -1))
    .map(router => {
      // console.log('====================================');
      // console.log(router, require(router));
      // console.log('====================================');
      // routers.push(require(router))
      // 是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头.
      routers.push(require(router).routes())
      routers.push(require(router).allowedMethods())
    })
  // console.log(routers)
  return compose(routers)
}

module.exports = registerRouter