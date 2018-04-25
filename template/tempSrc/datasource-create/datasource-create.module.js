"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var datasource_create_service_1 = require('./datasource-create.service');
var datasource_create_component_1 = require('./datasource-create.component');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var switch_module_1 = require('ng-cosmos-td-ui/src/base/switch/switch.module');
var input_module_1 = require('ng-cosmos-td-ui/src/base/input/input.module');
var button_module_1 = require('ng-cosmos-td-ui/src/base/button/button.module');
var form_module_1 = require('ng-cosmos-td-ui/src/base/form/form.module');
var select_module_1 = require('ng-cosmos-td-ui/src/base/select/select.module');
var DatasourceCreateModule = (function () {
    function DatasourceCreateModule() {
    }
    DatasourceCreateModule = __decorate([
        core_1.NgModule({
            declarations: [
                datasource_create_component_1.DatasourceCreateComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule,
                switch_module_1.SwitchModule,
                input_module_1.InputModule,
                button_module_1.ButtonModule,
                form_module_1.FormModule,
                select_module_1.SelectModule
            ],
            providers: [datasource_create_service_1.DatasourceCreateService],
            exports: [datasource_create_component_1.DatasourceCreateComponent]
        })
    ], DatasourceCreateModule);
    return DatasourceCreateModule;
}());
exports.DatasourceCreateModule = DatasourceCreateModule;
