"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var datasource_component_1 = require('./datasource.component');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var datasource_home_component_1 = require('./datasource-home/datasource-home.component');
var datasource_create_component_1 = require('./datasource-create/datasource-create.component');
var datasource_detail_component_1 = require('./datasource-detail/datasource-detail.component');
var routes = [{
        path: '',
        component: datasource_component_1.DatasourceComponent,
        children: [
            {
                path: '',
                component: datasource_home_component_1.DatasourceHomeComponent,
                data: {
                    'title': [
                        { 'name': '数据源管理', 'url': 'datasource' }
                    ]
                }
            },
            {
                path: 'create',
                component: datasource_create_component_1.DatasourceCreateComponent,
                data: {
                    'title': [
                        { 'name': '数据源管理', 'url': 'datasource' },
                        { 'name': '新增数据源', 'url': '' }
                    ],
                },
            },
            {
                path: 'modify/:id',
                component: datasource_create_component_1.DatasourceCreateComponent,
                data: {
                    'title': [
                        { 'name': '数据源管理', 'url': 'datasource' },
                        { 'name': '数据源详情', 'url': '' },
                        { 'name': '修改数据源', 'url': '' }
                    ]
                },
            },
            {
                path: 'detail/:id',
                component: datasource_detail_component_1.DatasourceDetailComponent,
                data: {
                    'title': [
                        { 'name': '数据源管理', 'url': 'datasource' },
                        { 'name': '数据源详情', 'url': '' }
                    ]
                }
            },
        ]
    }
];
var DatasourceRoutingModule = (function () {
    function DatasourceRoutingModule() {
    }
    DatasourceRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], DatasourceRoutingModule);
    return DatasourceRoutingModule;
}());
exports.DatasourceRoutingModule = DatasourceRoutingModule;
