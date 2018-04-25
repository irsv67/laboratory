"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var datasource_detail_module_1 = require('./datasource-detail/datasource-detail.module');
var datasource_create_module_1 = require('./datasource-create/datasource-create.module');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var datasource_component_1 = require('./datasource.component');
var datasource_routing_module_1 = require('./datasource-routing.module');
var datasource_home_module_1 = require('./datasource-home/datasource-home.module');
var DatasourceModule = (function () {
    function DatasourceModule() {
    }
    DatasourceModule = __decorate([
        core_1.NgModule({
            declarations: [
                datasource_component_1.DatasourceComponent
            ],
            imports: [
                forms_1.FormsModule,
                router_1.RouterModule,
                datasource_routing_module_1.DatasourceRoutingModule,
                datasource_home_module_1.DatasourceHomeModule,
                datasource_create_module_1.DatasourceCreateModule,
                datasource_detail_module_1.DatasourceDetailModule
            ],
            exports: [datasource_component_1.DatasourceComponent]
        })
    ], DatasourceModule);
    return DatasourceModule;
}());
exports.DatasourceModule = DatasourceModule;
