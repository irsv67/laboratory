"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var datasource_list_service_1 = require('./datasource-list.service');
var DatasourceListComponent = (function () {
    function DatasourceListComponent(mainService, datasourceListService, datasourceHomeService, _notification) {
        var _this = this;
        this.mainService = mainService;
        this.datasourceListService = datasourceListService;
        this.datasourceHomeService = datasourceHomeService;
        this._notification = _notification;
        this._dataSet = []; //必须在此声明,下面声明会从新为空
        this.queryParam = {
            page: 1,
            pageSize: 10,
            nameOperator: "like",
            orderBy: "createTime",
            order: "desc"
        }; //初始请求数据
        this.subscription = this.datasourceHomeService.missionGrabble$.subscribe(function (grabble) {
            _this.queryParam.page = 1;
            _this.queryParam.pageSize = 10;
            _this.searchMissHandler(grabble);
        });
    }
    ;
    DatasourceListComponent.prototype.searchMissHandler = function (grabble) {
        if (grabble.datasourceName) {
            this.queryParam['name'] = "%25" + grabble.datasourceName + "%25";
        }
        else {
            delete this.queryParam['name'];
        }
        if (grabble.metadataStatus == 1) {
            this.queryParam['status'] = grabble.metadataStatus;
        }
        else if (grabble.metadataStatus == 0) {
            this.queryParam['status'] = grabble.metadataStatus;
        }
        else {
            delete this.queryParam['status'];
        }
        if (grabble.datasourceType) {
            this.queryParam['type'] = grabble.datasourceType;
        }
        else {
            delete this.queryParam['type'];
        }
        this.refreshData();
    }; //查询条件
    DatasourceListComponent.prototype.pageIndexChange = function (pageIndex) {
        this.queryParam.page = pageIndex;
        this.refreshData();
    };
    DatasourceListComponent.prototype.changePageSize = function (event) {
        this.queryParam.pageSize = event;
        this.refreshData();
    };
    DatasourceListComponent.prototype.refreshData = function () {
        var _this = this;
        this.datasourceListService.query(this.queryParam).then(function (response) {
            _this._total = response.total;
            _this._dataSet = response.data;
        }).catch(function (err) {
            _this._notification.error("错误", err);
        });
    };
    DatasourceListComponent.prototype.ngOnInit = function () {
        this.refreshData();
    };
    DatasourceListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    DatasourceListComponent = __decorate([
        core_1.Component({
            selector: 'datasource-list',
            templateUrl: './datasource-list.component.html',
            styleUrls: ['./datasource-list.component.less'],
            providers: [datasource_list_service_1.DatasourceListService]
        })
    ], DatasourceListComponent);
    return DatasourceListComponent;
}());
exports.DatasourceListComponent = DatasourceListComponent;
