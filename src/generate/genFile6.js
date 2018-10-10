"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = require("ejs");
const fs_1 = require("fs");
/**
 * 类功能描述：根据模板生成代码
 */
//初始化配置参数
let tmpConfig = {
    tempName: "temp_ng_6x",
    appName: "my-app4",
};
let scanDirFunc = function (curSrcDir, curDestDir, curFolder) {
    let dir = fs_1.readdirSync(curSrcDir + curFolder);
    dir.forEach(function (item) {
        let curSrcFile = curSrcDir + curFolder + "/" + item;
        let tmpFile = fs_1.statSync(curSrcFile);
        let curFolderDest = curFolder.split(tmpConfig.tempName).join(tmpConfig.appName);
        let itemDest = item.split(tmpConfig.tempName).join(tmpConfig.appName);
        let curDestFile = curDestDir + curFolderDest + "/" + itemDest;
        if (tmpFile.isDirectory() && !(item == '.git')) {
            if (!fs_1.existsSync(curDestFile)) {
                fs_1.mkdirSync(curDestFile);
            }
            scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
        }
        else if (tmpFile.isFile()) {
            if (!item.endsWith(".ico")) {
                ejs_1.renderFile(curSrcFile, tmpConfig, function (err, str) {
                    fs_1.writeFile(curDestFile, str, function (err) {
                    });
                    console.log("file generated: " + curDestFile);
                });
            }
        }
    });
};
let baseSrcDir = "J:/test/";
let baseDestDir = "J:/test/";
//如果目标目录不存在，创建目标目录
if (!fs_1.existsSync(baseDestDir + tmpConfig.appName)) {
    fs_1.mkdirSync(baseDestDir + tmpConfig.appName);
}
//扫描，从当前模板目录开始
scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.tempName);
//# sourceMappingURL=genFile6.js.map