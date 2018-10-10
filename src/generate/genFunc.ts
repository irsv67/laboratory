import {renderFile} from "ejs";
import {writeFile, existsSync, mkdirSync} from "fs";

export interface RenderConfig {
    templateName: string,//模板名
    templateNameUpper: string,//模板名大写
    templateNameDesc: string,//模板描述
    moduleName: string,//模块名
    moduleNameUpper: string,//模块名大写
    moduleNameDesc: string,//模块描述
    subPathTail: string,//子路径
    fileNameTail: string//文件名后缀
}
