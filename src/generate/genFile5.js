"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = require("ejs");
const fs_1 = require("fs");
const configData_1 = require("./configData");
/**
 * 类功能描述：根据模板生成代码
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
// tmpConfig = {
//     templateName: "foo",
//     templateNameUpper: "Foo",
//     templateNameDesc: "fooDesc",
//     moduleName: "tdTag",
//     moduleNameUpper: "TdTag",
//     moduleNameDesc: "标签管理",
//     subPathTail: "",
//     fileNameTail: ""
// };
tmpConfig = {
    templateName: "testSingle",
    templateNameUpper: "TestSingle",
    templateNameDesc: "testSingleDesc",
    moduleName: "first",
    moduleNameUpper: "First",
    moduleNameDesc: "首个",
    subPathTail: "",
    fileNameTail: ""
};
// let dataObjNew = ConfigData.myTable;
// let dataObjNew = ConfigData.tdTag;
let dataObjNew = configData_1.ConfigData.testSingle;
let scanDirFunc = function (curSrcDir, curDestDir, curFolder) {
    let dir = fs_1.readdirSync(curSrcDir + curFolder);
    dir.forEach(function (item) {
        let curSrcFile = curSrcDir + curFolder + "/" + item;
        let tmpFile = fs_1.statSync(curSrcFile);
        let curFolderDest = curFolder.split(tmpConfig.templateName).join(tmpConfig.moduleName);
        let itemDest = item.split(tmpConfig.templateName).join(tmpConfig.moduleName).split(".ejs").join("");
        let curDestFile = curDestDir + curFolderDest + "/" + itemDest;
        if (tmpFile.isDirectory()) {
            if (!fs_1.existsSync(curDestFile)) {
                fs_1.mkdirSync(curDestFile);
            }
            scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
        }
        else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                ejs_1.renderFile(curSrcFile, dataObjNew, function (err, str) {
                    fs_1.writeFile(curDestFile, str, function (err) {
                    });
                    console.log("file generated: " + curDestFile);
                });
            }
        }
    });
};
let baseSrcDir = "D:/_gen_template/origin/";
// let baseSrcDir = "D:/_gen_template/change/";
let baseDestDir = "D:/_test/testZorro/src/app/";
// let baseDestDir = "D:/_git_work/cosmos-builder/src/app/main/";
//如果目标目录不存在，创建目标目录
if (!fs_1.existsSync(baseDestDir + tmpConfig.moduleName)) {
    fs_1.mkdirSync(baseDestDir + tmpConfig.moduleName);
}
//扫描，从当前模板目录开始
scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.templateName);
//# sourceMappingURL=genFile5.js.map