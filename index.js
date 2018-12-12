const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(bodyParser());
// add controllers:
app.use(routes());

app.listen(5480);