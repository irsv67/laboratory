import {renderFile} from "ejs";
import {writeFile, readdirSync, statSync, mkdirSync, existsSync} from "fs";

/**
 * 类功能描述：根据模板生成代码
 */

export class GenFileService {
    tempName: any = "temp_ng_6x"; //模板名
    appName: any = "conch2"; //模块名

    baseSrcDir: any = "k:/";
    baseDestDir: any = "k:/";

    scanDirFunc(curSrcDir: string, curDestDir: string, curFolder: string) {

        let that = this;

        let dir = readdirSync(curSrcDir + curFolder);
        dir.forEach(function (item) {
            let curSrcFile = curSrcDir + curFolder + "/" + item;
            let tmpFile = statSync(curSrcFile);

            let curFolderDest = curFolder.split(that.tempName).join(that.appName);
            let itemDest = item.split(that.tempName).join(that.appName);
            let curDestFile = curDestDir + curFolderDest + "/" + itemDest;

            if (tmpFile.isDirectory() && !(item == '.git')) {
                if (!existsSync(curDestFile)) {
                    mkdirSync(curDestFile);
                }
                that.scanDirFunc(curSrcDir + curFolder + "/", curDestDir + curFolderDest + "/", item);
            } else if (tmpFile.isFile()) {
                if (!item.endsWith(".ico")) {
                    renderFile(curSrcFile, {appName: that.appName}, function (err: Error, str: string) {
                        writeFile(curDestFile, str, function (err) {
                        });
                        console.log("file generated: " + curDestFile)
                    });
                }
            }
        })
    };

    createProject(projectName: any) {

        this.appName = projectName;

        //如果目标目录不存在，创建目标目录
        if (!existsSync(this.baseDestDir + this.appName)) {
            mkdirSync(this.baseDestDir + this.appName);
        }

        this.scanDirFunc(this.baseSrcDir, this.baseDestDir, this.tempName);
    }

}

//let instance = new GenFileService();
//
//if (!existsSync(instance.baseDestDir + instance.appName)) {
//    mkdirSync(instance.baseDestDir + instance.appName);
//}
//
//instance.scanDirFunc(instance.baseSrcDir, instance.baseDestDir, instance.tempName);