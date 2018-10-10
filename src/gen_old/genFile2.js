"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genFunc_1 = require("./genFunc");
//初始化配置参数
let tmpConfig = {
    templateName: "foo",
    templateNameUpper: "Foo",
    templateNameDesc: "Foo",
    moduleName: "datasource",
    moduleNameUpper: "Datasource",
    moduleNameDesc: "Datasource",
    subPathTail: "",
    fileNameTail: "" //文件名后缀
};
//初始化 html
tmpConfig.fileNameTail = ".component.html";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 less
tmpConfig.fileNameTail = ".component.less";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 component
tmpConfig.fileNameTail = ".component.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 model
tmpConfig.fileNameTail = ".model.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 module
tmpConfig.fileNameTail = ".module.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 service
tmpConfig.fileNameTail = ".service.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 routing
tmpConfig.fileNameTail = "-routing.module.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//==============home================
tmpConfig.subPathTail = "-home";
//初始化 home/html
tmpConfig.fileNameTail = "-home.component.html";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 home/less
tmpConfig.fileNameTail = "-home.component.less";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 home/component
tmpConfig.fileNameTail = "-home.component.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 home/model
tmpConfig.fileNameTail = "-home.model.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 home/module
tmpConfig.fileNameTail = "-home.module.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 home/service
tmpConfig.fileNameTail = "-home.service.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//==============list================
tmpConfig.subPathTail = "-list";
//初始化 list/html
tmpConfig.fileNameTail = "-list.component.html";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 list/less
tmpConfig.fileNameTail = "-list.component.less";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 list/component
tmpConfig.fileNameTail = "-list.component.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 list/model
tmpConfig.fileNameTail = "-list.model.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 list/module
tmpConfig.fileNameTail = "-list.module.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//初始化 list/service
tmpConfig.fileNameTail = "-list.service.ts";
genFunc_1.GenFunc.renderFile(tmpConfig);
//# sourceMappingURL=genFile2.js.map