const Router = require('koa-router');
const router = new Router()


router.prefix('/user')

router.get('/getBody', (ctx, next) => {
  ctx.response.body = {
    code: 1,
    message: '成功'
  }
})

router.post('/editBody', (ctx, next) => {
  let requestData = ctx.request.body;
  console.log('====================================');
  console.log(requestData);
  console.log('====================================');
  ctx.response.body = {
    code: 1,
    message: '成功',
    data: requestData
  }
})


module.exports = router;