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
var datasource_home_component_1 = require('./datasource-home.component');
//子模块
var datasource_list_module_1 = require('../datasource-list/datasource-list.module');
var datasource_operate_module_1 = require('../datasource-operate/datasource-operate.module');
var datasource_detail_module_1 = require('../datasource-detail/datasource-detail.module');
var datasource_search_module_1 = require('../datasource-search/datasource-search.module');
var datasource_home_service_1 = require('../datasource-home/datasource-home.service');
var DatasourceHomeModule = (function () {
    function DatasourceHomeModule() {
    }
    DatasourceHomeModule = __decorate([
        core_1.NgModule({
            declarations: [
                datasource_home_component_1.DatasourceHomeComponent
            ],
            imports: [
                forms_1.FormsModule,
                common_1.CommonModule,
                //    子模块
                datasource_list_module_1.DatasourceListModule,
                datasource_operate_module_1.DatasourceOperateModule,
                datasource_detail_module_1.DatasourceDetailModule,
                datasource_search_module_1.DatasourceSearchModule
            ],
            providers: [datasource_home_service_1.DatasourceHomeService],
            exports: [datasource_home_component_1.DatasourceHomeComponent]
        })
    ], DatasourceHomeModule);
    return DatasourceHomeModule;
}());
exports.DatasourceHomeModule = DatasourceHomeModule;
