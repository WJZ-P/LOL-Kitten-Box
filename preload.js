import {contextBridge,ipcRenderer} from "electron"

//定义一些通信方法
contextBridge.exposeInMainWorld('appWindowAPI',{
  windowMinimize:()=>{ipcRenderer.send('minimize')},
  windowMaximize:()=>{ipcRenderer.send('maximize')}
})

//定义一些工具方法
contextBridge.exposeInMainWorld('utils',{
  // usePersistedState:()=>{
  //   const {usePersistedState} = require("/src/Hooks/usePersistedState.js")
  //   return usePersistedState
  // },
  writeFile: (filename, text, callback) => {
        fs.writeFile(filename, text, callback);
    }
})

//下面定义一些LCUAPI的方法
contextBridge.exposeInMainWorld('LCUAPI',{
  matchAccept:()=>{ipcRenderer.send('LCU-matchAccept')},
  cancleMatchAccept:()=>{ipcRenderer.send('LCU-cancleMatchAccept')}
})


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})