const Router = require('koa-router');
const router = new Router()
const fs = require('fs')
const path = require('path')
const multer = require('koa-multer');

router.prefix('/api/common')


// https://blog.csdn.net/simple__dream/article/details/80890696
// koaBody的multipart: true
// 单个文件上传 使用koa-body
router.post('/uploadFile', async (ctx, next) => {
  // 上传文件 获取文件
  const file = ctx.request.files.file;
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  let filePath = path.join(__dirname, '../public/upload/') + `/${file.name}`
  // 创建可写流
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  // ctx.response.body = {
  //   code: 0,
  //   data: '上传成功！'
  // }
  return ctx.body = '上传成功'
})

// 多个文件上传 --- 使用koa-body
router.post('/uploadFiles', async (ctx, next) => {
  console.log('====================================');
  console.log(ctx.request.files);
  console.log('====================================');
  // 上传多个文件
  const files = ctx.request.files.file;
  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    // 获取上传文件拓展名
    let filePath = path.join(__dirname, '../public/upload/') + `/${file.name}`
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream)
  }
  return ctx.body = '上传成功'
})


// 文件上传  使用koa-multer  不会跟koa-body冲突
// https://www.jianshu.com/p/f9062b969a6e
let storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/'))
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
  // filename: (ctx, file, cb) => {
  //   console.log('====================================');
  //   console.log(file);
  //   console.log('====================================');
  //   cb(null, Date.now() + file.originalname)
  // }
})
let uploadOption = multer({ storage: storage })
router.post('/uploadMulter', uploadOption.single('file'), async (ctx, next) => {
  if (ctx.req.file) {
    ctx.body = 'upload success';
  } else {
    ctx.body = 'upload error';
  }

})


module.exports = router;
