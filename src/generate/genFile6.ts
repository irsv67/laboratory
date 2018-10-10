import { renderFile } from "ejs";
import { writeFile, readdirSync, statSync, mkdirSync, existsSync } from "fs";

/**
 * 类功能描述：根据模板生成代码
 */

//初始化配置参数
let tmpConfig: any = {
    tempName: "temp_ng_6x",//模板名
    appName: "my-app4",//模块名
};

let scanDirFunc = function (curSrcDir: string, curDestDir: string, curFolder: string) {

    let dir = readdirSync(curSrcDir + curFolder);
    dir.forEach(function (item) {
        let curSrcFile = curSrcDir + curFolder + "/" + item;
        let tmpFile = statSync(curSrcFile);

        let curFolderDest = curFolder.split(tmpConfig.tempName).join(tmpConfig.appName);
        let itemDest = item.split(tmpConfig.tempName).join(tmpConfig.appName);
        let curDestFile = curDestDir + curFolderDest + "/" + itemDest;

        if (tmpFile.isDirectory() && !(item == '.git')) {
            if (!existsSync(curDestFile)) {
                mkdirSync(curDestFile);
            }
            scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
        } else if (tmpFile.isFile()) {
            if (!item.endsWith(".ico")) {
                renderFile(curSrcFile, tmpConfig, function (err: Error, str: string) {
                    writeFile(curDestFile, str, function (err) {
                    });
                    console.log("file generated: " + curDestFile)
                });
            }
        }
    })
};

let baseSrcDir = "J:/test/";
let baseDestDir = "J:/test/";

//如果目标目录不存在，创建目标目录
if (!existsSync(baseDestDir + tmpConfig.appName)) {
    mkdirSync(baseDestDir + tmpConfig.appName);
}

//扫描，从当前模板目录开始
scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.tempName);
