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
let dataObjNew = {
    foo: "myTable",
    Foo: "MyTable",
    fooDesc: "连接配置",
    columnList: [{
            name: "id",
            desc: "ID",
            type: "normal"
        }, {
            name: "name",
            desc: "连接配置名称",
            type: "normal"
        }, {
            name: "type",
            desc: "类型",
            type: "normal"
        }, {
            name: "status",
            desc: "状态",
            type: "normal"
        }, {
            name: "description",
            desc: "描述",
            type: "normal"
        }, {
            name: "creator",
            desc: "创建人",
            type: "normal"
        }, {
            name: "createTime",
            desc: "创建时间",
            type: "normal"
        }, {
            name: "",
            desc: "操作",
            type: "control"
        }],
};
for (let i = 0; i < dataObjNew.columnList.length; i++) {
    let obj = dataObjNew.columnList[i];
}
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
// let baseSrcDir = "D:/_gen_template/origin/";
let baseSrcDir = "D:/_gen_template/change/";
// let baseDestDir = "D:/_gen_template/tmp/";
let baseDestDir = "D:/_git_work/cosmos-builder/src/app/main/";
//如果目标目录不存在，创建目标目录
if (!fs_1.existsSync(baseDestDir + tmpConfig.moduleName)) {
    fs_1.mkdirSync(baseDestDir + tmpConfig.moduleName);
}
//扫描，从当前模板目录开始
scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.templateName);
//# sourceMappingURL=genFile5.js.map