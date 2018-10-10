import {RenderConfig} from "./genFunc";
import {renderFile} from "ejs";
import {writeFile, readdirSync, statSync, mkdirSync, existsSync} from "fs";
import {ConfigData} from "./configData";

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
let dataObjNew = ConfigData.testSingle;

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

let baseSrcDir = "D:/_gen_template/origin/";
// let baseSrcDir = "D:/_gen_template/change/";

let baseDestDir = "D:/_test/testZorro/src/app/";
// let baseDestDir = "D:/_git_work/cosmos-builder/src/app/main/";

//如果目标目录不存在，创建目标目录
if (!existsSync(baseDestDir + tmpConfig.moduleName)) {
    mkdirSync(baseDestDir + tmpConfig.moduleName);
}

//扫描，从当前模板目录开始
scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.templateName);
