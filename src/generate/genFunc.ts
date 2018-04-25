import {renderFile} from "ejs";
import {writeFile} from "fs";
import {existsSync} from "fs";
import {mkdirSync} from "fs";
//existsSync

export interface RenderConfig {
    templateName: string,//模板名
    templateNameUpper: string,//模板名大写
    moduleName: string,//模块名
    moduleNameUpper: string,//模块名大写
    subPathTail: string,//子路径
    fileNameTail: string//文件名后缀
}

export class GenFunc {

    public static renderFile(config: RenderConfig) {

        let baseDir = "../../template/";

        if (!existsSync(baseDir + config.moduleName)) {
            mkdirSync(baseDir + config.moduleName);
        }

        let subPathTemplateName = "";
        let subPathModuleName = "";
        if (config.subPathTail) {
            subPathTemplateName = config.templateName + config.subPathTail + "/";
            subPathModuleName = config.moduleName + config.subPathTail + "/";
            if (!existsSync(baseDir + config.moduleName + "/" + subPathModuleName)) {
                mkdirSync(baseDir + config.moduleName + "/" + subPathModuleName);
            }
        }

        let dataObj = {};
        dataObj[config.templateName] = config.moduleName;
        dataObj[config.templateNameUpper] = config.moduleNameUpper;

        let tempFullPath = baseDir + config.templateName + "/" + subPathTemplateName + config.templateName + config.fileNameTail + ".ejs";
        renderFile(tempFullPath, dataObj, function (err: Error, str: string) {
            let filePath = baseDir + config.moduleName + "/" + subPathModuleName + config.moduleName + config.fileNameTail;
            writeFile(filePath, str, function (err) {
            });
            console.log("file generated: " + filePath)
        });
    }
}