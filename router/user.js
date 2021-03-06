const Router = require('koa-router');
const router = new Router()
let tokenTool = require('../utils/jwt.js')

router.prefix('/api')

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

// 获取个人信息
router.get('/user', (ctx, next) => {

})

router.post('/login', (ctx, next) => {
  let requestData = ctx.request.body;
  let { name, password } = requestData;

  let token = tokenTool.generationToken({ name, password })

})


module.exports = router;