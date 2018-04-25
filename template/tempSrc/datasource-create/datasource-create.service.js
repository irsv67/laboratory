"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var crud_service_1 = require("../../../service/crud.service");
var DatasourceCreateService = (function (_super) {
    __extends(DatasourceCreateService, _super);
    function DatasourceCreateService(http, store) {
        var _this = this;
        _super.call(this, http);
        this.http = http;
        this.store = store;
        this.hasSaved = false;
        if (process.env.NODE_ENV === "development") {
            this.baseUrl = "/datareport/metadata";
        }
        else if (process.env.NODE_ENV === "production") {
            this.baseUrl = "/datareport/metadata";
        }
        else if (process.env.NODE_ENV === "demo") {
            this.baseUrl = "/metadata/metadata";
        }
        this.saveRouter = "datasources"; //保存
        this.updateRouter = "datasources"; //修改数据
        this.getRouter = "datasources"; //获取
        this.msg$ = store.select('msg');
        this.msg$.subscribe(function (data) {
            _this.msg = data;
        });
    }
    DatasourceCreateService.prototype.test = function (data) {
        var url = this.baseUrl + "/testConnect";
        return this.http
            .post(url, JSON.stringify(data), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    }; //测试
    DatasourceCreateService = __decorate([
        core_1.Injectable()
    ], DatasourceCreateService);
    return DatasourceCreateService;
}(crud_service_1.CRUDService));
exports.DatasourceCreateService = DatasourceCreateService;
