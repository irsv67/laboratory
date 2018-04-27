"use strict";
class ConfigData {
}
ConfigData.myTable = {
    foo: "myTable",
    Foo: "MyTable",
    fooDesc: "连接配置",
    listArray: [
        {
            name: "id",
            desc: "ID",
            type: "normal"
        }, {
            name: "name",
            desc: "连接配置名称",
            type: "normal"
        }, {
            name: "type",
            desc: "类型",
            type: "normal"
        }, {
            name: "status",
            desc: "状态",
            type: "normal"
        }, {
            name: "description",
            desc: "描述",
            type: "normal"
        }, {
            name: "creator",
            desc: "创建人",
            type: "normal"
        }, {
            name: "createTime",
            desc: "创建时间",
            type: "normal"
        }, {
            name: "",
            desc: "操作",
            type: "control"
        }],
    formArray: [
        {
            name: "id",
            desc: "ID",
            type: "normal"
        }, {
            name: "name",
            desc: "连接配置名称",
            type: "normal"
        }, {
            name: "type",
            desc: "连接配置类型",
            type: "normal"
        }, {
            name: "host",
            desc: "主机IP",
            type: "normal"
        }, {
            name: "database",
            desc: "数据库名称",
            type: "normal"
        }, {
            name: "port",
            desc: "端口号",
            type: "normal"
        }, {
            name: "userName",
            desc: "用户名",
            type: "normal"
        }, {
            name: "description",
            desc: "描述",
            type: "normal"
        }, {
            name: "status",
            desc: "状态",
            type: "normal"
        }],
};
ConfigData.tdTag = {
    foo: "tdTag",
    Foo: "TdTag",
    fooDesc: "标签管理",
    "searchArray": [{ "name": "name", "desc": "标签名称", "type": "normal" }, {
            "name": "type",
            "desc": "类型",
            "type": "normal"
        }, { "name": "status", "desc": "状态", "type": "normal" }],
    "listArray": [{ "name": "name", "desc": "标签名称", "type": "normal" }, {
            "name": "code",
            "desc": "编码",
            "type": "normal"
        }, { "name": "type", "desc": "类型", "type": "normal" }, {
            "name": "source",
            "desc": "标签来源",
            "type": "normal"
        }, { "name": "calc_status", "desc": "计算状态", "type": "normal" }, {
            "name": "status",
            "desc": "状态",
            "type": "normal"
        }],
    "formArray": [{ "name": "name", "desc": "标签名称", "type": "normal" }, {
            "name": "type",
            "desc": "类型",
            "type": "normal"
        }, { "name": "source", "desc": "标签来源", "type": "normal" }, { "name": "status", "desc": "状态", "type": "normal" }]
};
exports.ConfigData = ConfigData;
//# sourceMappingURL=configData.js.map