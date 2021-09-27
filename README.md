# vue-electron

## Preliminary work

### Important

- Use Node.js > 14 & yarn
- Install yarn、node-gyp for global
- Install Visual Studio 2015 or above and install python2.7
- Install windows-build-tools `by administrator`

```
npm install yarn -g
npm install --global --production windows-build-tools
npm install -g node-gyp
```

### Debug

#### When Install windows-build-tools encounter problems.Please refer to the solution below

解決步驟：

- 運行 npm install -g windows-build-tools
- 在%temp%文件夾中找到最新的文件名類似於 dd_installer_20210421124746.log 的文件
- 查看此文件，確保日誌中輸出了 Closing the installer with exit code 0
- 確保你安裝了 vscode(ps:其實可以直接跳過 2–4 步，因為你的 python 環境早就安裝好了，重複的步驟安裝程序早就執行完畢了)
- 在%temp%目錄下創建一個名為 dd*client*.log 的文件
- 編輯 5 中創建的文件，加入一行 Closing installer. Return code: 3010.然後保存。
- 重新執行 `npm install -g windows-build-tools` & `npm install -g node-gyp`

#### When have problem `Xcode or CLT Version Deleted` in mac.Please refer to the solution below

- 參考 https://devmanna.blogspot.com/2020/08/macos-mac-gyp-no-xcode-or-clt-version.html
- 關閉 vscode 後重啟 再進行一次 yarn install

#### When you development in Windows7,because nodejs must > 14. So build & install will be no work.Please refer to the solution below

- When must be `Install or Build` . Create and Open VM(Windows8.1 or above) and install/build in this environment. And copy `node-modules` file to target.
- Beacuse fs.promise is no work on Node.js < 14.

## Project setup

```
yarn install
```

### Compiles and hot-reloads

#### for development

```
yarn serve
```

#### for production

```
yarn build
```

### Compiles with electron

#### for development

```
yarn start-serve
```

#### for production

```
yarn start-build
```

### Rebuild

When to use:

- Install all or anly plugin (After yarn add/install)
- After build a production. Must do rebuild and start-serve!

```
yarn win-re  (for windows)
yarn mac-re  (for Mac)
```

### References

- See [Configuration Reference](https://cli.vuejs.org/config/).
- See [Electron & Vue](https://ithelp.ithome.com.tw/articles/10254290)
