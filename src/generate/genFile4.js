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
tmpConfig = {
    templateName: "foo",
    templateNameUpper: "Foo",
    templateNameDesc: "fooDesc",
    moduleName: "myTable",
    moduleNameUpper: "MyTable",
    moduleNameDesc: "连接配置",
    subPathTail: "",
    fileNameTail: ""
};
tmpConfig = {
    templateName: "foo",
    templateNameUpper: "Foo",
    templateNameDesc: "fooDesc",
    moduleName: "tdTag",
    moduleNameUpper: "TdTag",
    moduleNameDesc: "标签管理",
    subPathTail: "",
    fileNameTail: ""
};
let copy2 = function (fReadName, fWriteName) {
    let fRead = fs_1.createReadStream(fReadName);
    let fWrite = fs_1.createWriteStream(fWriteName);
    let objReadline = readline_1.createInterface({
        input: fRead,
    });
    let index = 1;
    let passCode = false;
    objReadline.on('line', (line) => {
        let tmp = '';
        if (line.indexOf('include(') != -1) {
            tmp = line.split('<!--').join('<%- ')
                .split('-->').join(' %>');
            fWrite.write(line + os_1.EOL);
            fWrite.write(tmp + os_1.EOL);
            passCode = true;
        }
        else if (line.indexOf('include_end') != -1) {
            fWrite.write(line + os_1.EOL);
            passCode = false;
        }
        else if (!passCode) {
            tmp = line.split(tmpConfig.moduleName).join('<%=' + tmpConfig.templateName + '%>')
                .split(tmpConfig.moduleNameUpper).join('<%=' + tmpConfig.templateNameUpper + '%>')
                .split(tmpConfig.moduleNameDesc).join('<%=' + tmpConfig.templateNameDesc + '%>');
            fWrite.write(tmp + os_1.EOL);
        }
        index++;
    });
    objReadline.on('close', () => {
        // console.log('readline close...');
    });
};
let scanDirFunc = function (curSrcDir, curDestDir, curFolder) {
    let dir = fs_1.readdirSync(curSrcDir + curFolder);
    dir.forEach(function (item) {
        let curSrcFile = curSrcDir + curFolder + "/" + item;
        let tmpFile = fs_1.statSync(curSrcFile);
        let curFolderDest = curFolder.split(tmpConfig.moduleName).join(tmpConfig.templateName);
        let itemDest = item.split(tmpConfig.moduleName).join(tmpConfig.templateName);
        let curDestFile = curDestDir + curFolderDest + "/" + itemDest;
        if (tmpFile.isDirectory()) {
            if (!fs_1.existsSync(curDestFile)) {
                fs_1.mkdirSync(curDestFile);
            }
            scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
        }
        else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                copy2(curSrcFile, curDestFile + ".ejs");
                console.log("copy file: " + curDestFile + ".ejs");
            }
        }
    });
};
// let baseSrcDir = "../../template/";
let baseSrcDir = "D:/_git_work/cosmos-builder/src/app/main/";
// let baseDestDir = "../../template/";
let baseDestDir = "D:/_gen_template/origin/";
//如果是跟目录，创建模板目录
if (!fs_1.existsSync(baseDestDir + tmpConfig.templateName)) {
    fs_1.mkdirSync(baseDestDir + tmpConfig.templateName);
}
scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.moduleName);
//# sourceMappingURL=genFile4.js.map