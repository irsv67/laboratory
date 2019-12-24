"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutService_1 = require("./service/LayoutService");
class BaseRouter {
    constructor() {
        const layoutService = new LayoutService_1.LayoutService();
        this.funcMap = {
            retrieveLayoutList: layoutService.retrieveLayoutList
        };
        this.nodeMap = {
            createDataSource: '/createDataSource',
            updateDataSource: '/updateDataSource',
            retrieveDataSourceList: '/retrieveDataSourceList',
            deleteDataSource: '/deleteDataSource/:dsId',
            retrieveMetadataList: '/retrieveMetadataList',
            findMetaById: '/findMetaById/:metaId',
            createMetadata: '/createMetadata',
            updateMetadata: '/updateMetadata',
            deleteMetadata: '/deleteMetadata/:metaId',
            physicalMetaObjects: '/physicalMetaObjects/:dsId',
            physicalMetaAttributes: '/physicalMetaAttributes/:dsId',
            createLayout: '/createLayout',
            retrieveLayoutList: '/retrieveLayoutList',
            updateLayout: '/updateLayout',
            deleteLayout: '/deleteLayout',
            getLayoutById: '/getLayoutById/:layoutId',
            getEnumList: '/getEnumList',
            getMetaAttrList: '/getMetaAttrList/:cubeId',
            getData: '/getChartData',
        };
        this.methodMap = {
            createDataSource: 'post',
            updateDataSource: 'put',
            retrieveDataSourceList: 'get',
            deleteDataSource: 'delete',
            retrieveMetadataList: 'get',
            findMetaById: 'get',
            createMetadata: 'post',
            updateMetadata: 'put',
            deleteMetadata: 'delete',
            physicalMetaObjects: 'get',
            physicalMetaAttributes: 'post',
            createLayout: 'post',
            retrieveLayoutList: 'get',
            updateLayout: 'post',
            deleteLayout: 'post',
            getLayoutById: 'get',
            getEnumList: 'post',
            getMetaAttrList: 'get',
            getData: 'post',
        };
    }
    initRouter(router, connection) {
        for (const key in this.funcMap) {
            if (this.funcMap.hasOwnProperty(key)) {
                const func = this.funcMap[key];
                router.get(this.nodeMap[key], function (req, res) {
                    func(connection, req, (retObj) => {
                        res.send(retObj);
                    });
                });
            }
        }
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map