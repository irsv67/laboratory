"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = require("ejs");
const fs_1 = require("fs");
class GenFunc {
    static renderFile(config) {
        let baseDir = "../../template/";
        if (!fs_1.existsSync(baseDir + config.moduleName)) {
            fs_1.mkdirSync(baseDir + config.moduleName);
        }
        let subPathTemplateName = "";
        let subPathModuleName = "";
        if (config.subPathTail) {
            subPathTemplateName = config.templateName + config.subPathTail + "/";
            subPathModuleName = config.moduleName + config.subPathTail + "/";
            if (!fs_1.existsSync(baseDir + config.moduleName + "/" + subPathModuleName)) {
                fs_1.mkdirSync(baseDir + config.moduleName + "/" + subPathModuleName);
            }
        }
        let dataObj = {};
        dataObj[config.templateName] = config.moduleName;
        dataObj[config.templateNameUpper] = config.moduleNameUpper;
        let tempFullPath = baseDir + config.templateName + "/" + subPathTemplateName + config.templateName + config.fileNameTail + ".ejs";
        ejs_1.renderFile(tempFullPath, dataObj, function (err, str) {
            let filePath = baseDir + config.moduleName + "/" + subPathModuleName + config.moduleName + config.fileNameTail;
            fs_1.writeFile(filePath, str, function (err) {
            });
            console.log("file generated: " + filePath);
        });
    }
}
exports.GenFunc = GenFunc;
//# sourceMappingURL=genFunc.js.map