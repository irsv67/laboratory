"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DatasourceHomeComponent = (function () {
    function DatasourceHomeComponent(route, mainService) {
        this.route = route;
        this.mainService = mainService;
        this.title = this.route.snapshot.data['title'];
    }
    DatasourceHomeComponent.prototype.ngOnInit = function () {
        this.changeTitle(this.title);
    };
    DatasourceHomeComponent.prototype.changeTitle = function (title) {
        var _this = this;
        setTimeout(function () {
            _this.mainService.titleMission(title);
        }, 0);
    };
    DatasourceHomeComponent.prototype.ngOnDestroy = function () {
    };
    DatasourceHomeComponent = __decorate([
        core_1.Component({
            selector: 'datasource-home',
            templateUrl: './datasource-home.component.html',
            styleUrls: ['./datasource-home.component.less']
        })
    ], DatasourceHomeComponent);
    return DatasourceHomeComponent;
}());
exports.DatasourceHomeComponent = DatasourceHomeComponent;
