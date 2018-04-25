"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var config_dictionary_1 = require('../../../../config/config.dictionary');
var DatasourceSearchComponent = (function () {
    function DatasourceSearchComponent(fb, datasourceHomeService) {
        var _this = this;
        this.fb = fb;
        this.datasourceHomeService = datasourceHomeService;
        this.submitForm = function ($event, value) {
            $event.preventDefault();
            for (var key in _this.validateForm.controls) {
                _this.validateForm.controls[key].markAsDirty();
            }
        };
        this.information();
    }
    DatasourceSearchComponent.prototype.information = function () {
        this.validateForm = this.fb.group({
            datasourceName: [''],
            datasourceType: [''],
            metadataStatus: [''],
        });
        this.status = config_dictionary_1.dictionary.statusSearch;
        this.metadataStatus = "";
        this.types = config_dictionary_1.dictionary.dataSourceTypeSearch;
        this.datasourceType = '';
    }; //初始数据
    DatasourceSearchComponent.prototype.searchHandler = function () {
        this.datasourceHomeService.homeValue(this.validateForm.value);
    }; //查询
    DatasourceSearchComponent.prototype.ngOnInit = function () {
    };
    DatasourceSearchComponent.prototype.resetForm = function () {
        var _this = this;
        this.validateForm.reset();
        setTimeout(function () {
            _this.information();
        }, 0);
        this.datasourceHomeService.homeValue(this.validateForm.value);
    }; //重置
    DatasourceSearchComponent.prototype.getFormControl = function (name) {
        return this.validateForm.controls[name];
    };
    DatasourceSearchComponent.prototype.ngOnDestroy = function () {
    };
    DatasourceSearchComponent = __decorate([
        core_1.Component({
            selector: 'datasource-search',
            templateUrl: './datasource-search.component.html',
            styleUrls: ['./datasource-search.component.less'],
            providers: [forms_1.FormBuilder]
        })
    ], DatasourceSearchComponent);
    return DatasourceSearchComponent;
}());
exports.DatasourceSearchComponent = DatasourceSearchComponent;
