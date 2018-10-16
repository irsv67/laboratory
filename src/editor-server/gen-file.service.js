"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = require("ejs");
const fs_1 = require("fs");
/**
 * 类功能描述：根据模板生成代码
 */
class GenFileService {
    constructor() {
        this.tempName = "temp_ng_6x"; //模板名
        this.appName = "conch2"; //模块名
        this.baseSrcDir = "k:/";
        this.baseDestDir = "k:/";
    }
    scanDirFunc(curSrcDir, curDestDir, curFolder) {
        let that = this;
        let dir = fs_1.readdirSync(curSrcDir + curFolder);
        dir.forEach(function (item) {
            let curSrcFile = curSrcDir + curFolder + "/" + item;
            let tmpFile = fs_1.statSync(curSrcFile);
            let curFolderDest = curFolder.split(that.tempName).join(that.appName);
            let itemDest = item.split(that.tempName).join(that.appName);
            let curDestFile = curDestDir + curFolderDest + "/" + itemDest;
            if (tmpFile.isDirectory() && !(item == '.git')) {
                if (!fs_1.existsSync(curDestFile)) {
                    fs_1.mkdirSync(curDestFile);
                }
                that.scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
            }
            else if (tmpFile.isFile()) {
                if (!item.endsWith(".ico")) {
                    ejs_1.renderFile(curSrcFile, { appName: that.appName }, function (err, str) {
                        fs_1.writeFile(curDestFile, str, function (err) {
                        });
                        console.log("file generated: " + curDestFile);
                    });
                }
            }
        });
    }
    ;
    createProject(projectName) {
        this.appName = projectName;
        //如果目标目录不存在，创建目标目录
        if (!fs_1.existsSync(this.baseDestDir + this.appName)) {
            fs_1.mkdirSync(this.baseDestDir + this.appName);
        }
        this.scanDirFunc(this.baseSrcDir, this.baseDestDir, this.tempName);
    }
}
exports.GenFileService = GenFileService;
//let instance = new GenFileService();
//
//if (!existsSync(instance.baseDestDir + instance.appName)) {
//    mkdirSync(instance.baseDestDir + instance.appName);
//}
//
//instance.scanDirFunc(instance.baseSrcDir, instance.baseDestDir, instance.tempName);
//# sourceMappingURL=gen-file.service.js.map