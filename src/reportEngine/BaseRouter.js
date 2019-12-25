"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataModelService_1 = require("./service/DataModelService");
const DataSetService_1 = require("./service/DataSetService");
const DataSourceService_1 = require("./service/DataSourceService");
const LayoutService_1 = require("./service/LayoutService");
const RouterService_1 = require("./service/RouterService");
class BaseRouter {
    constructor() {
        const dataModelService = new DataModelService_1.DataModelService();
        const dataSetService = new DataSetService_1.DataSetService();
        const dataSourceService = new DataSourceService_1.DataSourceService();
        const layoutService = new LayoutService_1.LayoutService();
        const routerService = new RouterService_1.RouterService();
        this.instMap = {
            getModelTables: dataModelService,
            exportTable: dataModelService,
            createDataSource: dataSourceService,
            updateDataSource: dataSourceService,
            retrieveDataSourceList: dataSourceService,
            deleteDataSource: dataSourceService,
            retrieveMetadataList: dataSetService,
            findMetaById: dataSetService,
            createMetadata: dataSetService,
            updateMetadata: dataSetService,
            deleteMetadata: dataSetService,
            physicalMetaObjects: routerService,
            physicalMetaAttributes: routerService,
            createLayout: layoutService,
            updateLayout: layoutService,
            retrieveLayoutList: layoutService,
            deleteLayout: layoutService,
            getLayoutById: layoutService,
            getEnumList: layoutService,
            getMetaAttrList: dataSetService,
            getData: layoutService,
        };
        this.funcMap = {
            getModelTables: dataModelService.getModelTables,
            exportTable: dataModelService.exportTable,
            createDataSource: dataSourceService.createDataSource,
            updateDataSource: dataSourceService.updateDataSource,
            retrieveDataSourceList: dataSourceService.retrieveDataSourceList,
            deleteDataSource: dataSourceService.deleteDataSource,
            retrieveMetadataList: dataSetService.retrieveMetadataList,
            findMetaById: dataSetService.findMetaById,
            createMetadata: dataSetService.createMetadata,
            updateMetadata: dataSetService.updateMetadata,
            deleteMetadata: dataSetService.deleteMetadata,
            physicalMetaObjects: routerService.physicalMetaObjects,
            physicalMetaAttributes: routerService.physicalMetaAttributes,
            createLayout: layoutService.createLayout,
            updateLayout: layoutService.updateLayout,
            retrieveLayoutList: layoutService.retrieveLayoutList,
            deleteLayout: layoutService.deleteLayout,
            getLayoutById: layoutService.getLayoutById,
            getEnumList: layoutService.getEnumList,
            getMetaAttrList: dataSetService.getMetaAttrList,
            getData: layoutService.getData,
        };
        this.nodeMap = {
            getModelTables: '/getModelTables',
            exportTable: '/exportTable/:tableName',
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
            getData: '/getData',
        };
        this.methodMap = {
            getModelTables: 'get',
            exportTable: 'get',
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
        const that = this;
        for (const key in this.funcMap) {
            if (this.funcMap.hasOwnProperty(key)) {
                const func = this.funcMap[key];
                const url = this.nodeMap[key];
                const method = this.methodMap[key];
                const funcOuter = (req, res) => {
                    func.call(that.instMap[key], connection, req, (retObj) => {
                        res.send(retObj);
                    });
                };
                if (method === 'get') {
                    router.get(url, funcOuter);
                }
                else if (method === 'post') {
                    router.post(url, funcOuter);
                }
                else if (method === 'put') {
                    router.put(url, funcOuter);
                }
                else if (method === 'delete') {
                    router.delete(url, funcOuter);
                }
            }
        }
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map