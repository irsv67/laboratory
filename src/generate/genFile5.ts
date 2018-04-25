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

let baseDir = "../../template/";
let rootSrc = "foo";

let scanDirFunc = function (baseDir: string, curDir: string, root: boolean) {
    //如果是跟目录，创建模板目录
    if (root && !existsSync(baseDir + tmpConfig.moduleName)) {
        mkdirSync(baseDir + tmpConfig.moduleName);
    }

    let dir = readdirSync(baseDir + curDir);
    dir.forEach(function (item) {
        let curSrcFile = baseDir + curDir + "/" + item;
        let tmpFile = statSync(curSrcFile);

        let pathTemplate = (curSrcFile)
            .replace(rootSrc, tmpConfig.moduleName)
            .split(tmpConfig.templateName).join(tmpConfig.moduleName)
            .split('.ejs').join('');
        // .replace(tmpConfig.moduleName, tmpConfig.moduleName)
        if (tmpFile.isDirectory()) {
            if (!existsSync(pathTemplate)) {
                mkdirSync(pathTemplate);
            }
            scanDirFunc(baseDir + curDir + "/", item, false);
        } else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {

                let dataObj = {};
                dataObj[tmpConfig.templateName] = tmpConfig.moduleName;
                dataObj[tmpConfig.templateNameUpper] = tmpConfig.moduleNameUpper;
                dataObj[tmpConfig.templateNameDesc] = tmpConfig.moduleNameDesc;

                renderFile(curSrcFile, dataObj, function (err: Error, str: string) {
                    writeFile(pathTemplate, str, function (err) {
                    });
                    console.log("file generated: " + pathTemplate)
                });

                // copy2(curSrcFile, pathTemplate + ".ejs");
                console.log("copy file: " + pathTemplate + ".ejs");
            }
        }
    })
};

scanDirFunc(baseDir, rootSrc, true);
