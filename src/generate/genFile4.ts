import {GenFunc, RenderConfig} from "./genFunc";

import {readdirSync} from "fs";
import {statSync} from "fs";
import {stat} from "fs";

import {createReadStream} from 'fs';
import {createWriteStream} from 'fs';
import {mkdirSync} from 'fs';
import {existsSync} from 'fs';

/**
 * 类功能描述：反向生成模板
 */

let copy = function (_src, _dst) {
    // 读取目录中的所有文件/目录
    let readable, writable;
    stat(_src, function (err, st) {
        if (err) {
            throw err;
        }
        // 判断是否为文件
        if (st.isFile()) {
            // 创建读取流
            readable = createReadStream(_src);
            // 创建写入流
            writable = createWriteStream(_dst);
            // 通过管道来传输流
            readable.pipe(writable);
        }

    });
};

//初始化配置参数
let tmpConfig: RenderConfig = {
    templateName: "fooBar",//模板名
    templateNameUpper: "FooBar",//模板名大写
    moduleName: "datasource",//模块名
    moduleNameUpper: "Datasource",//模块名大写
    subPathTail: "",//子路径
    fileNameTail: ""//文件名后缀
};

let baseDir = "../../template/";
let rootSrc = "tempSrc";

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
            // .replace(tmpConfig.moduleName, tmpConfig.templateName)
            // .replace(tmpConfig.moduleName, tmpConfig.templateName);

        //var mystring = "this,is,a,test"
        // mystring.replace(/,/g, "newchar");
        if (tmpFile.isDirectory()) {
            if (!existsSync(pathTemplate)) {
                mkdirSync(pathTemplate);
            }
            scanDirFunc(baseDir + curDir + "/", item, false);
        } else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                copy(curSrcFile, pathTemplate + ".ejs");
                console.log("copy file: " + pathTemplate + ".ejs");
            }
        }
    })
};

scanDirFunc(baseDir, rootSrc, true);