"use strict";
const fs_1 = require("fs");
const readline_1 = require("readline");
const os_1 = require("os");
/**
 * 类功能描述：反向生成模板
 */
//初始化配置参数
let tmpConfig = {
    templateName: "foo",
    templateNameUpper: "Foo",
    templateNameDesc: "fooDesc",
    moduleName: "datasource",
    moduleNameUpper: "Datasource",
    moduleNameDesc: "数据源",
    subPathTail: "",
    fileNameTail: "" //文件名后缀
};
let baseDir = "../../template/";
let rootSrc = "tempSrc";
let copy2 = function (fReadName, fWriteName) {
    let fRead = fs_1.createReadStream(fReadName);
    let fWrite = fs_1.createWriteStream(fWriteName);
    let objReadline = readline_1.createInterface({
        input: fRead,
    });
    let index = 1;
    objReadline.on('line', (line) => {
        let tmp = line.split(tmpConfig.moduleName).join('<%=' + tmpConfig.templateName + '%>')
            .split(tmpConfig.moduleNameUpper).join('<%=' + tmpConfig.templateNameUpper + '%>')
            .split(tmpConfig.moduleNameDesc).join('<%=' + tmpConfig.templateNameDesc + '%>');
        fWrite.write(tmp + os_1.EOL); // 下一行
        // console.log(index, line);
        index++;
    });
    objReadline.on('close', () => {
        // console.log('readline close...');
    });
};
let scanDirFunc = function (baseDir, curDir, root) {
    //如果是跟目录，创建模板目录
    if (root && !fs_1.existsSync(baseDir + tmpConfig.templateName)) {
        fs_1.mkdirSync(baseDir + tmpConfig.templateName);
    }
    let dir = fs_1.readdirSync(baseDir + curDir);
    dir.forEach(function (item) {
        let curSrcFile = baseDir + curDir + "/" + item;
        let tmpFile = fs_1.statSync(curSrcFile);
        let pathTemplate = (curSrcFile)
            .replace(rootSrc, tmpConfig.templateName)
            .split(tmpConfig.moduleName).join(tmpConfig.templateName);
        // .replace(tmpConfig.moduleName, tmpConfig.templateName)
        if (tmpFile.isDirectory()) {
            if (!fs_1.existsSync(pathTemplate)) {
                fs_1.mkdirSync(pathTemplate);
            }
            scanDirFunc(baseDir + curDir + "/", item, false);
        }
        else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                copy2(curSrcFile, pathTemplate + ".ejs");
                console.log("copy file: " + pathTemplate + ".ejs");
            }
        }
    });
};
scanDirFunc(baseDir, rootSrc, true);
//# sourceMappingURL=genFile4.js.map