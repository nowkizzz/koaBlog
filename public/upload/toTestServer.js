const path = require("path")
const fs = require("fs")
const node_ssh = require("node-ssh")
const ssh = new node_ssh()
const tar = require('tar-fs')
const zlib = require('zlib')


let serverOption = {
  serverHost: '192.168.3.155',
  username: 'root',
  password: '123456',
  // 本地打包后放的文件夹 注意是windows是\需要再加\\表示\
  // clientPath: 'D:\\product\\web_operationCenter\\dist',
  // 服务器前台所放的地址
  serverPath: '/opt/src/web_operationcenter/',
  // 打包后压缩的文件名
  tarName: 'dist.tar.gz',
  // 打包的文件夹名
  distName: 'dist',
  // 备份脚本的文件名
  shName: '155update.sh'
}

// 导出文件
console.log('==========================================')
console.log('该脚本目标为把前端包自动化部署到服务器前台代码位置，并备份上一次打包的压缩代码到backup文件夹')
console.log('开始执行打包到服务器' + serverOption.serverHost)
// 压缩文件
tar.pack(path.resolve(__dirname, '../dist'), {
  map: function (header) {
    // console.log(header, '头部栏')
    header.name = serverOption.distName + '/' + header.name
    return header
  },
  finish: function (sameAsMypack) {
    console.log('压缩成tar.gz文件')
    let frReader = fs.createReadStream(path.resolve(__dirname, serverOption.distName + '.tar')).pipe(zlib.createGzip()).pipe(fs.createWriteStream(path.resolve(__dirname, serverOption.tarName)));
    frReader.on('finish', () => {
      console.log('成功压缩文件就连接服务器')
      putFileToServer()
    })
  }
}).pipe(fs.createWriteStream(path.resolve(__dirname, serverOption.distName + '.tar')))



function putFileToServer() {
  // node连接ssh
  ssh.connect({
    host: serverOption.serverHost,
    username: serverOption.username,
    port: 22,
    password: serverOption.password,
    tyrKeyboard: true,
    onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
      if (prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')) {
        finish([serverOption.password])
      }
    }
  }).then(function () {
    // 执行备份脚本
    ssh.execCommand('chmod 777 ' + serverOption.shName, {
      cwd: serverOption.serverPath,
    }).then(function (result) {
      // console.log('返回结果', result)
      // console.log('执行脚本成功: ' + result.stdout)
      console.log('执行备份脚本: ', result.stderr ? '失败：' + result.stderr : '成功')
    })
      // upload file
      .then(function () {
        // 放文件
        ssh.putFile(path.resolve(__dirname, serverOption.tarName), serverOption.serverPath + serverOption.tarName).then(function () {
          console.log("压缩包已上传到服务器")
          ssh.execCommand('tar -zxvf ' + serverOption.tarName, {
            cwd: serverOption.serverPath,
          }).then(function (result) {
            console.log('解压压缩包', result.stderr ? '失败：' + result.stderr : '成功')
            // console.log('执行错误的提示有么', result.stderr)
            // 设置权限为root可写可执行
            ssh.execCommand('chmod -R 777 ' + serverOption.distName, {
              cwd: serverOption.serverPath,
            }).then(function (res) {
              console.log('设置解压后的文件夹为可执行', res.stderr ? '失败：' + res.stderr : '成功')
              fs.unlink(path.resolve(__dirname, serverOption.distName + '.tar'), (err) => {
                if (err) throw err;
                console.log('已成功删除dist.tar');
              })
              fs.unlink(path.resolve(__dirname, serverOption.tarName), (err) => {
                if (err) throw err;
                console.log('已成功删除dist.tar.gz');
              })
              console.log('执行成功,任务完成')
              console.log('==========================================')
              ssh.dispose()
            })
          })
          // ssh.dispose()
        }, function (error) {
          console.log("Something's wrong")
          console.log(error)
        })
      })
  })
}
