import { DataModelService } from "./service/DataModelService";
import { DataSetService } from "./service/DataSetService";
import { DataSourceService } from "./service/DataSourceService";
import { LayoutService } from "./service/LayoutService";
import { RouterService } from "./service/RouterService";

export class BaseRouter {

    instMap: {};

    funcMap: {};

    nodeMap: {};

    paramMap: {};

    methodMap: {};

    constructor() {
        const dataModelService = new DataModelService();
        const dataSetService = new DataSetService();
        const dataSourceService = new DataSourceService();
        const layoutService = new LayoutService();
        const routerService = new RouterService();

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
            exportTable: '/exportTable',

            createDataSource: '/createDataSource',
            updateDataSource: '/updateDataSource',
            retrieveDataSourceList: '/retrieveDataSourceList',
            deleteDataSource: '/deleteDataSource',

            retrieveMetadataList: '/retrieveMetadataList',
            findMetaById: '/findMetaById',
            createMetadata: '/createMetadata',
            updateMetadata: '/updateMetadata',
            deleteMetadata: '/deleteMetadata',

            physicalMetaObjects: '/physicalMetaObjects',
            physicalMetaAttributes: '/physicalMetaAttributes',

            createLayout: '/createLayout',
            retrieveLayoutList: '/retrieveLayoutList',
            updateLayout: '/updateLayout',
            deleteLayout: '/deleteLayout',
            getLayoutById: '/getLayoutById',

            getEnumList: '/getEnumList',
            getMetaAttrList: '/getMetaAttrList',
            getData: '/getData',
        };

        this.paramMap = {
            getModelTables: '',
            exportTable: '&tableName=:tableName',

            createDataSource: '',
            updateDataSource: '',
            retrieveDataSourceList: '&orderBy=createTime&order=desc',
            deleteDataSource: '&dsId=:dsId',

            retrieveMetadataList: '&orderBy=createTime&order=desc&search=:search',
            findMetaById: '&metaId=:metaId',
            createMetadata: '',
            updateMetadata: '',
            deleteMetadata: '&metaId=:metaId',

            physicalMetaObjects: '&dsId=:dsId',
            physicalMetaAttributes: '&dsId=:dsId',

            createLayout: '&productId=:productId',
            retrieveLayoutList: '&orderBy=createTime&order=desc&productId=:productId',
            updateLayout: '&productId=:productId',
            deleteLayout: '&enable=:enable',
            getLayoutById: '&layoutId=:layoutId',

            getEnumList: '',
            getMetaAttrList: '&cubeId=:cubeId',
            getData: '',
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
                    })
                }

                if (method === 'get') {
                    router.get(url, funcOuter);
                } else if (method === 'post') {
                    router.post(url, funcOuter);
                } else if (method === 'put') {
                    router.put(url, funcOuter);
                } else if (method === 'delete') {
                    router.delete(url, funcOuter);
                }

            }
        }
    }
}