import {RenderConfig} from "./genFunc";
import {readdirSync, statSync, createReadStream, createWriteStream, mkdirSync, existsSync} from "fs";
import {createInterface} from "readline";
import {EOL} from "os";

/**
 * 类功能描述：反向生成模板
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

let baseDir = "../../template/";
let rootSrc = "tempSrc";

let copy2 = function (fReadName, fWriteName) {

    let fRead = createReadStream(fReadName);
    let fWrite = createWriteStream(fWriteName);

    let objReadline = createInterface({
        input: fRead,
    });

    let index = 1;
    objReadline.on('line', (line) => {
        let tmp = line.split(tmpConfig.moduleName).join('<%=' + tmpConfig.templateName + '%>')
            .split(tmpConfig.moduleNameUpper).join('<%=' + tmpConfig.templateNameUpper + '%>')
            .split(tmpConfig.moduleNameDesc).join('<%=' + tmpConfig.templateNameDesc + '%>');
        fWrite.write(tmp + EOL); // 下一行
        // console.log(index, line);
        index++;
    });

    objReadline.on('close', () => {
        // console.log('readline close...');
    });
};

let scanDirFunc = function (baseDir: string, curDir: string, root: boolean) {
    //如果是跟目录，创建模板目录
    if (root && !existsSync(baseDir + tmpConfig.templateName)) {
        mkdirSync(baseDir + tmpConfig.templateName);
    }

    let dir = readdirSync(baseDir + curDir);
    dir.forEach(function (item) {
        let curSrcFile = baseDir + curDir + "/" + item;
        let tmpFile = statSync(curSrcFile);

        let pathTemplate = (curSrcFile)
            .replace(rootSrc, tmpConfig.templateName)
            .split(tmpConfig.moduleName).join(tmpConfig.templateName)
        // .replace(tmpConfig.moduleName, tmpConfig.templateName)
        if (tmpFile.isDirectory()) {
            if (!existsSync(pathTemplate)) {
                mkdirSync(pathTemplate);
            }
            scanDirFunc(baseDir + curDir + "/", item, false);
        } else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                copy2(curSrcFile, pathTemplate + ".ejs");
                console.log("copy file: " + pathTemplate + ".ejs");
            }
        }
    })
};

scanDirFunc(baseDir, rootSrc, true);