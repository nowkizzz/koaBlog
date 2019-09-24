const Router = require('koa-router');
const router = new Router()
const query = require('../utils/query')
const { SELECT_PARAMS_TABLE} = require('../utils/sql')

router.prefix('/api/blog')

// 查询博客列表
router.get('/blogs', async (ctx, next) => {
  console.log('====================================');
  console.log(ctx.params);
  console.log('====================================');
  // SQL语句查询数据库
  let res = await query(SELECT_PARAMS_TABLE({
    tableName: 'bloglist', 
    selectQuery: ['id', 'title', 'author'],
    pageSize: 2,
    pageIndex: 1
  }))
    console.log('====================================');
    console.log(res);
    console.log('====================================');

  ctx.body = {
    code: 200,
    success: true,
    message: '成功',
    data: res.data[1],
    query: {
      totalCount: res.data[0][0]["COUNT(*)"]
    }
  }
})

// 新增博客
router.post('/blog', (ctx, next) => {
  console.log('====================================');
  console.log(ctx.request.body);
  console.log('====================================');
  ctx.response.body = {
    code: 200,
    message: '新增成功'
  }
})



module.exports = router;
