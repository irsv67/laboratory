"use strict";
const ejs_1 = require("ejs");
const fs_1 = require("fs");
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
let baseDir = "../../template/";
let rootSrc = "foo";
let scanDirFunc = function (baseDir, curDir, root) {
    //如果是跟目录，创建模板目录
    if (root && !fs_1.existsSync(baseDir + tmpConfig.moduleName)) {
        fs_1.mkdirSync(baseDir + tmpConfig.moduleName);
    }
    let dir = fs_1.readdirSync(baseDir + curDir);
    dir.forEach(function (item) {
        let curSrcFile = baseDir + curDir + "/" + item;
        let tmpFile = fs_1.statSync(curSrcFile);
        let pathTemplate = (curSrcFile)
            .replace(rootSrc, tmpConfig.moduleName)
            .split(tmpConfig.templateName).join(tmpConfig.moduleName)
            .split('.ejs').join('');
        // .replace(tmpConfig.moduleName, tmpConfig.moduleName)
        if (tmpFile.isDirectory()) {
            if (!fs_1.existsSync(pathTemplate)) {
                fs_1.mkdirSync(pathTemplate);
            }
            scanDirFunc(baseDir + curDir + "/", item, false);
        }
        else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                let dataObj = {};
                dataObj[tmpConfig.templateName] = tmpConfig.moduleName;
                dataObj[tmpConfig.templateNameUpper] = tmpConfig.moduleNameUpper;
                dataObj[tmpConfig.templateNameDesc] = tmpConfig.moduleNameDesc;
                ejs_1.renderFile(curSrcFile, dataObj, function (err, str) {
                    fs_1.writeFile(pathTemplate, str, function (err) {
                    });
                    console.log("file generated: " + pathTemplate);
                });
                // copy2(curSrcFile, pathTemplate + ".ejs");
                console.log("copy file: " + pathTemplate + ".ejs");
            }
        }
    });
};
scanDirFunc(baseDir, rootSrc, true);
//# sourceMappingURL=genFile5.js.map