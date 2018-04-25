"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var datasource_detail_service_1 = require('./datasource-detail.service');
var datasource_detail_component_1 = require('./datasource-detail.component');
var form_module_1 = require('ng-cosmos-td-ui/src/base/form/form.module');
var button_module_1 = require('ng-cosmos-td-ui/src/base/button/button.module');
var DatasourceDetailModule = (function () {
    function DatasourceDetailModule() {
    }
    DatasourceDetailModule = __decorate([
        core_1.NgModule({
            declarations: [
                datasource_detail_component_1.DatasourceDetailComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                form_module_1.FormModule,
                button_module_1.ButtonModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [datasource_detail_service_1.DatasourceDetailService],
            exports: [datasource_detail_component_1.DatasourceDetailComponent]
        })
    ], DatasourceDetailModule);
    return DatasourceDetailModule;
}());
exports.DatasourceDetailModule = DatasourceDetailModule;
