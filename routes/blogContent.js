

let fn_getBlogList = async (ctx, next) => {
  var pageSize = ctx.params.pageSize || 10,
      pageIndex = ctx.params.pageIndex || 1;
  ctx.response.body = {
    code: 0,
    success: true,
    list: [{
      id: 1,
      title: '明星大侦探',
      content: 'jfk了但是广泛大使馆'
    }]
  }
}

module.exports = {
  'GET /api/getBlogList': fn_getBlogList
}