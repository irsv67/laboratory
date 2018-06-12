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

tmpConfig = {
    templateName: "testSingle",
    templateNameUpper: "TestSingle",
    templateNameDesc: "testSingleDesc",
    moduleName: "main",
    moduleNameUpper: "Main",
    moduleNameDesc: "主页",
    subPathTail: "",
    fileNameTail: ""
};

let copy2 = function (fReadName, fWriteName) {

    let fRead = createReadStream(fReadName);
    let fWrite = createWriteStream(fWriteName);

    let objReadline = createInterface({
        input: fRead,
    });

    let index = 1;
    let passCode = false;
    objReadline.on('line', (line) => {

        let tmp = '';
        if (line.indexOf('include(') != -1) {
            tmp = line.split('<!--').join('<%- ')
                .split('-->').join(' %>');

            fWrite.write(line + EOL);
            fWrite.write(tmp + EOL);
            passCode = true;
        } else if (line.indexOf('include_end') != -1) {
            fWrite.write(line + EOL);
            passCode = false;
        } else if (!passCode) {
            tmp = line.split(tmpConfig.moduleName).join('<%=' + tmpConfig.templateName + '%>')
                .split(tmpConfig.moduleNameUpper).join('<%=' + tmpConfig.templateNameUpper + '%>')
                .split(tmpConfig.moduleNameDesc).join('<%=' + tmpConfig.templateNameDesc + '%>');
            fWrite.write(tmp + EOL);
        }

        index++;
    });

    objReadline.on('close', () => {
        // console.log('readline close...');
    });
};

let scanDirFunc = function (curSrcDir: string, curDestDir: string, curFolder: string) {

    let dir = readdirSync(curSrcDir + curFolder);
    dir.forEach(function (item) {
        let curSrcFile = curSrcDir + curFolder + "/" + item;
        let tmpFile = statSync(curSrcFile);

        let curFolderDest = curFolder.split(tmpConfig.moduleName).join(tmpConfig.templateName);
        let itemDest = item.split(tmpConfig.moduleName).join(tmpConfig.templateName);
        let curDestFile = curDestDir + curFolderDest + "/" + itemDest;

        if (tmpFile.isDirectory()) {
            if (!existsSync(curDestFile)) {
                mkdirSync(curDestFile);
            }
            scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
        } else if (tmpFile.isFile()) {
            if (!item.endsWith(".js")) {
                copy2(curSrcFile, curDestFile + ".ejs");
                console.log("copy file: " + curDestFile + ".ejs");
            }
        }
    })
};

let baseSrcDir = "D:/_test/testZorro/src/app/";
// let baseSrcDir = "D:/_git_work/cosmos-builder/src/app/main/";

// let baseDestDir = "../../template/";
let baseDestDir = "D:/_gen_template/origin/";

//如果是跟目录，创建模板目录
if (!existsSync(baseDestDir + tmpConfig.templateName)) {
    mkdirSync(baseDestDir + tmpConfig.templateName);
}

scanDirFunc(baseSrcDir, baseDestDir, tmpConfig.moduleName);