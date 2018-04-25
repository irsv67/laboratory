import {GenFunc, RenderConfig} from "./genFunc";

//初始化配置参数
let tmpConfig: RenderConfig = {
    templateName: "foo",//模板名
    templateNameUpper: "Foo",//模板名大写
    moduleName: "datasource",//模块名
    moduleNameUpper: "Datasource",//模块名大写
    subPathTail: "",//子路径
    fileNameTail: ""//文件名后缀
};

//初始化 html
tmpConfig.fileNameTail = ".component.html";
GenFunc.renderFile(tmpConfig);

//初始化 less
tmpConfig.fileNameTail = ".component.less";
GenFunc.renderFile(tmpConfig);

//初始化 component
tmpConfig.fileNameTail = ".component.ts";
GenFunc.renderFile(tmpConfig);

//初始化 model
tmpConfig.fileNameTail = ".model.ts";
GenFunc.renderFile(tmpConfig);

//初始化 module
tmpConfig.fileNameTail = ".module.ts";
GenFunc.renderFile(tmpConfig);

//初始化 service
tmpConfig.fileNameTail = ".service.ts";
GenFunc.renderFile(tmpConfig);

//初始化 routing
tmpConfig.fileNameTail = "-routing.module.ts";
GenFunc.renderFile(tmpConfig);

//==============home================

tmpConfig.subPathTail = "-home";

//初始化 home/html
tmpConfig.fileNameTail = "-home.component.html";
GenFunc.renderFile(tmpConfig);

//初始化 home/less
tmpConfig.fileNameTail = "-home.component.less";
GenFunc.renderFile(tmpConfig);

//初始化 home/component
tmpConfig.fileNameTail = "-home.component.ts";
GenFunc.renderFile(tmpConfig);

//初始化 home/model
tmpConfig.fileNameTail = "-home.model.ts";
GenFunc.renderFile(tmpConfig);

//初始化 home/module
tmpConfig.fileNameTail = "-home.module.ts";
GenFunc.renderFile(tmpConfig);

//初始化 home/service
tmpConfig.fileNameTail = "-home.service.ts";
GenFunc.renderFile(tmpConfig);

//==============list================


tmpConfig.subPathTail = "-list";

//初始化 list/html
tmpConfig.fileNameTail = "-list.component.html";
GenFunc.renderFile(tmpConfig);

//初始化 list/less
tmpConfig.fileNameTail = "-list.component.less";
GenFunc.renderFile(tmpConfig);

//初始化 list/component
tmpConfig.fileNameTail = "-list.component.ts";
GenFunc.renderFile(tmpConfig);

//初始化 list/model
tmpConfig.fileNameTail = "-list.model.ts";
GenFunc.renderFile(tmpConfig);

//初始化 list/module
tmpConfig.fileNameTail = "-list.module.ts";
GenFunc.renderFile(tmpConfig);

//初始化 list/service
tmpConfig.fileNameTail = "-list.service.ts";
GenFunc.renderFile(tmpConfig);