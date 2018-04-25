"use strict";
const fs_1 = require("fs");
const fs_2 = require("fs");
const fs_3 = require("fs");
const fs_4 = require('fs');
const fs_5 = require('fs');
const fs_6 = require('fs');
const fs_7 = require('fs');
/**
 * 类功能描述：反向生成模板
 */
let copy = function (_src, _dst) {
    // 读取目录中的所有文件/目录
    let readable, writable;
    fs_3.stat(_src, function (err, st) {
        if (err) {
            throw err;
        }
        // 判断是否为文件
        if (st.isFile()) {
            // 创建读取流
            readable = fs_4.createReadStream(_src);
            // 创建写入流
            writable = fs_5.createWriteStream(_dst);
            // 通过管道来传输流
            readable.pipe(writable);
        }
    });
};
//初始化配置参数
let tmpConfig = {
    templateName: "fooBar",
    templateNameUpper: "FooBar",
    moduleName: "datasource",
    moduleNameUpper: "Datasource",
    subPathTail: "",
    fileNameTail: "" //文件名后缀
};
let baseDir = "../../template/";
let rootSrc = "tempSrc";
let scanDirFunc = function (baseDir, curDir, root) {
    //如果是跟目录，创建模板目录
    if (root && !fs_7.existsSync(baseDir + tmpConfig.templateName)) {
        fs_6.mkdirSync(baseDir + tmpConfig.templateName);
    }
    let dir = fs_1.readdirSync(baseDir + curDir);
    dir.forEach(function (item) {
        let curSrcFile = baseDir + curDir + "/" + item;
        let tmpFile = fs_2.statSync(curSrcFile);
        let pathTemplate = (curSrcFile)
            .replace(rootSrc, tmpConfig.templateName)
            .split(tmpConfig.moduleName).join(tmpConfig.templateName);
        // .replace(tmpConfig.moduleName, tmpConfig.templateName)
        // .replace(tmpConfig.moduleName, tmpConfig.templateName)
        // .replace(tmpConfig.moduleName, tmpConfig.templateName);
        //var mystring = "this,is,a,test"
        // mystring.replace(/,/g, "newchar");
        if (tmpFile.isDirectory()) {
            if (!fs_7.existsSync(pathTemplate)) {
                fs_6.mkdirSync(pathTemplate);
            }
            scanDirFunc(baseDir + curDir + "/", item, false);
        }
        else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                copy(curSrcFile, pathTemplate + ".ejs");
                console.log("copy file: " + pathTemplate + ".ejs");
            }
        }
    });
};
scanDirFunc(baseDir, rootSrc, true);
//# sourceMappingURL=genFile4.js.map