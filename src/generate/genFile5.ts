import {GenFunc, RenderConfig} from "./genFunc";
import {renderFile} from "ejs";
import {writeFile, readdirSync, statSync, mkdirSync, existsSync} from "fs";

/**
 * 类功能描述：根据模板生成代码
 */

//初始化配置参数
let tmpConfig: RenderConfig = {
    templateName: "foo",//模板名
    templateNameUpper: "Foo",//模板名大写
    templateNameDesc: "fooDesc",
    moduleName: "datasource",//模块名
    moduleNameUpper: "Datasource",//模块名大写
    moduleNameDesc: "数据源",
    subPathTail: "",//子路径
    fileNameTail: ""//文件名后缀
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

let scanDirFunc = function (curSrcDir: string, curDestDir: string, curFolder: string) {

    let dir = readdirSync(curSrcDir + curFolder);
    dir.forEach(function (item) {
        let curSrcFile = curSrcDir + curFolder + "/" + item;
        let tmpFile = statSync(curSrcFile);

        let curFolderDest = curFolder.split(tmpConfig.templateName).join(tmpConfig.moduleName);
        let itemDest = item.split(tmpConfig.templateName).join(tmpConfig.moduleName).split(".ejs").join("");
        let curDestFile = curDestDir + curFolderDest + "/" + itemDest;

        if (tmpFile.isDirectory()) {
            if (!existsSync(curDestFile)) {
                mkdirSync(curDestFile);
            }
            scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
        } else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                renderFile(curSrcFile, dataObjNew, function (err: Error, str: string) {
                    writeFile(curDestFile, str, function (err) {
                    });
                    console.log("file generated: " + curDestFile)
                });
            }
        }
    })
};

// let baseSrcDir = "D:/_gen_template/origin/";
let baseSrcDir = "D:/_gen_template/change/";

// let baseDestDir = "D:/_gen_template/tmp/";
let baseDestDir = "D:/_git_work/cosmos-builder/src/app/main/";

//如果目标目录不存在，创建目标目录
if (!existsSync(baseDestDir + tmpConfig.moduleName)) {
    mkdirSync(baseDestDir + tmpConfig.moduleName);
}

//扫描，从当前模板目录开始
scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.templateName);
