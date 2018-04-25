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
var datasource_search_service_1 = require('./datasource-search.service');
var datasource_search_component_1 = require('./datasource-search.component');
var input_module_1 = require('ng-cosmos-td-ui/src/base/input/input.module');
var button_module_1 = require('ng-cosmos-td-ui/src/base/button/button.module');
var form_module_1 = require('ng-cosmos-td-ui/src/base/form/form.module');
var select_module_1 = require('ng-cosmos-td-ui/src/base/select/select.module');
var DatasourceSearchModule = (function () {
    function DatasourceSearchModule() {
    }
    DatasourceSearchModule = __decorate([
        core_1.NgModule({
            declarations: [
                datasource_search_component_1.DatasourceSearchComponent
            ],
            imports: [
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                input_module_1.InputModule,
                button_module_1.ButtonModule,
                form_module_1.FormModule,
                select_module_1.SelectModule
            ],
            providers: [datasource_search_service_1.DatasourceSearchService],
            exports: [datasource_search_component_1.DatasourceSearchComponent]
        })
    ], DatasourceSearchModule);
    return DatasourceSearchModule;
}());
exports.DatasourceSearchModule = DatasourceSearchModule;
