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
var datasource_list_service_1 = require('./datasource-list.service');
var datasource_list_component_1 = require('./datasource-list.component');
var pipe_module_1 = require('../../../pipes/pipe.module');
var table_module_1 = require('ng-cosmos-td-ui/src/base/table/table.module');
var DatasourceListModule = (function () {
    function DatasourceListModule() {
    }
    DatasourceListModule = __decorate([
        core_1.NgModule({
            declarations: [
                datasource_list_component_1.DatasourceListComponent
            ],
            imports: [
                forms_1.FormsModule,
                router_1.RouterModule,
                common_1.CommonModule,
                table_module_1.TableModule,
                pipe_module_1.PipeModule
            ],
            providers: [datasource_list_component_1.DatasourceListComponent, datasource_list_service_1.DatasourceListService],
            exports: [datasource_list_component_1.DatasourceListComponent]
        })
    ], DatasourceListModule);
    return DatasourceListModule;
}());
exports.DatasourceListModule = DatasourceListModule;
