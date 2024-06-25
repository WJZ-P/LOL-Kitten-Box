const {app, BrowserWindow} = require('electron')
const path = require('node:path')
const url=require('url')
// 获取在 package.json 中的命令脚本传入的参数，来判断是开发还是生产环境
const mode = process.argv[2];
//把创建窗口独立成一个函数
function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true//允许在渲染进程中使用node
        }
    })
//判断是否是开发模式
    if (mode === 'dev') {//这里通过启动脚本来判断是否是开发者模式，主要看有没有dev参数
        mainWindow.loadURL("http://localhost:3000/")//开发者模式就载入3000端口的react
    } else {
        mainWindow.loadURL(url.format({//否则就载入本地的html,需要打包后才能用，不打包没有build文件夹
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }
}

app.on("ready", createWindow)//监听app打开事件，直接调用创建窗口函数
app.on("window-all-closed", () => {
    console.log('所有窗口都关闭啦，下面退出程序')
    app.quit()
})