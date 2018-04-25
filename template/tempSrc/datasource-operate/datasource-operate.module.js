"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var datasource_operate_service_1 = require('./datasource-operate.service');
var datasource_operate_component_1 = require('./datasource-operate.component');
var button_module_1 = require('ng-cosmos-td-ui/src/base/button/button.module');
var DatasourceOperateModule = (function () {
    function DatasourceOperateModule() {
    }
    DatasourceOperateModule = __decorate([
        core_1.NgModule({
            declarations: [
                datasource_operate_component_1.DatasourceOperateComponent
            ],
            imports: [
                forms_1.FormsModule,
                router_1.RouterModule,
                common_1.CommonModule,
                button_module_1.ButtonModule
            ],
            providers: [datasource_operate_service_1.DatasourceOperateService],
            exports: [datasource_operate_component_1.DatasourceOperateComponent]
        })
    ], DatasourceOperateModule);
    return DatasourceOperateModule;
}());
exports.DatasourceOperateModule = DatasourceOperateModule;
