const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body')
const koaStatic = require('koa-static');
const logger = require('koa-logger')
const path = require('path');
const chalk = require('chalk')
// const routes = require('./routes');
const registerRouter = require('./router')
const tool = require('./utils/tool')
// const port = process.env.PORT || 4620
// console.log('====================================');
// console.log('listen接口为: ' + (process.argv.slice(2)[0] ? process.argv.slice(2)[0] : 4620));
// console.log('====================================');
let port = process.argv.slice(2)[0] || 4620

// log request URL:
// app.use(async (ctx, next) => {
//   console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//   await next();
// });

// app.use(bodyParser());
// app.use(koaBody({
//   multipart: true,
//   // formidable: {
//   //   maxFileSize: 200 * 1024 * 1024  // 设置上传文件大小最大限制， 默认2M
//   // }
// }))

// 添加日志
// https://www.jb51.net/article/151720.htm
app.use(koaBody({ multipart: true }));
app.use(koaStatic(path.join(__dirname, 'public')))
// add controllers:
// app.use(routes());
app.use(registerRouter())
app.use(logger())

app.listen(port, () => {
  console.log(chalk.cyanBright(tool.getFormatTime(Date.now()) + '  ' + chalk.cyanBright('server success start for ' + port)))
})