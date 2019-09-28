const Router = require('koa-router');
const router = new Router()
const query = require('../utils/query')
const { SELECT_PARAMS_TABLE, INSERT_TABLE_COMMON, INSERT_TABLE} = require('../utils/sql')
const { getFormatTime} = require('../utils/tool.js')

router.prefix('/api/blog')

// 查询博客列表
router.get('/blogs', async (ctx, next) => {
  console.log('====================================');
  console.log(ctx.params);
  console.log('====================================');
  // SQL语句查询数据库
  let res = await query(SELECT_PARAMS_TABLE({
    tableName: 'bloglist', 
    // selectQuery: ['id', 'title', 'author'],
    pageSize: ctx.params.pageSize ? ctx.params.pageSize : 10,
    pageIndex: ctx.params.pageSize ? ctx.params.pageSize : 1,
  }))
    // console.log('====================================');
    // console.log(res);
    // console.log('====================================');
  let resultData = res.data[1].map(x => {
    return {
      author: x.author,
      createTime: x.createTime,
      createTimeTip: getFormatTime(x.createTime),
      id: x.id,
      title: x.title,
      remark: x.remark,
      userId: x.userId
    }
  })
  ctx.body = {
    code: 200,
    success: true,
    message: '成功',
    data: resultData,
    query: {
      totalCount: res.data[0][0]["COUNT(*)"]
    }
  }
})

// 新增博客
router.post('/blog', async (ctx, next) => {
  console.log('====================================');
  console.log('传回的信息', ctx.request.body);
  console.log('====================================');
  let requestData = ctx.request.body;
  if (requestData.id) {

  } else {
    delete requestData.id;
  }
  let sql = INSERT_TABLE('bloglist', requestData)
  let res = await query(sql)
  console.log('====================================');
  console.log(res);
  console.log('====================================');
  if (res.success) {
    ctx.response.body = {
      code: 200,
      message: '新增成功'
    }
  } else {
    ctx.response.body = {
      code: res.code,
      message: res.data
    }
  }
})



module.exports = router;
