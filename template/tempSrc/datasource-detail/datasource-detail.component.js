"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var DatasourceDetailComponent = (function () {
    function DatasourceDetailComponent(fb, route, mainService, datasourceDetailService, _notification) {
        this.fb = fb;
        this.route = route;
        this.mainService = mainService;
        this.datasourceDetailService = datasourceDetailService;
        this._notification = _notification;
        this.datasourceDeta = {}; //数据源详情
        this.id = this.route.snapshot.params.id;
        this.metadataId = this.route.params['value']['id'];
        this.title = this.route.snapshot.data['title'];
        this.title[1]['url'] = "datasource/" + this.route.snapshot.url[0]['path'] + "/" + this.metadataId;
        this.validateForm = this.fb.group({
            state: [''],
        });
    }
    DatasourceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.changeTitle(this.title);
        this.datasourceDetailService.get(this.id).then(function (response) {
            _this.datasourceDeta = response;
            _this.status = _this.datasourceDeta.status == "1" ? true : false;
        }).catch(function (err) {
            _this._notification.error("错误", err);
        });
    };
    DatasourceDetailComponent.prototype.ngOnDestroy = function () {
    };
    DatasourceDetailComponent.prototype.getFormControl = function (name) {
        return this.validateForm.controls[name];
    };
    DatasourceDetailComponent.prototype.changeTitle = function (title) {
        var _this = this;
        setTimeout(function () {
            _this.mainService.titleMission(title);
        }, 0);
    };
    DatasourceDetailComponent = __decorate([
        core_1.Component({
            selector: 'datasource-detail',
            templateUrl: './datasource-detail.component.html',
            styleUrls: ['./datasource-detail.component.less'],
            providers: [forms_1.FormBuilder]
        })
    ], DatasourceDetailComponent);
    return DatasourceDetailComponent;
}());
exports.DatasourceDetailComponent = DatasourceDetailComponent;
