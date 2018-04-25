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
var DatasourceCreateComponent = (function () {
    function DatasourceCreateComponent(_message, store, fb, route, router, mainService, datasourceCreateService) {
        var _this = this;
        this._message = _message;
        this.store = store;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.mainService = mainService;
        this.datasourceCreateService = datasourceCreateService;
        this.datasourceName = ""; //数据源名称
        this.singledom = "JDBC";
        this.version = 1;
        this.regular = {};
        this.sure = true;
        this.controlArray = [];
        this.submitForm = function ($event, value) {
            $event.preventDefault();
            for (var key in this.validateForm.controls) {
                this.validateForm.controls[key].markAsDirty();
            }
        };
        this.submitForm1 = function ($event, value) {
            $event.preventDefault();
            for (var key in this.validateForm1.controls) {
                this.validateForm1.controls[key].markAsDirty();
            }
        };
        this.submitForm2 = function ($event, value) {
            $event.preventDefault();
            for (var key in this.validateForm2.controls) {
                this.validateForm2.controls[key].markAsDirty();
            }
        };
        this.submitForm3 = function ($event, value) {
            $event.preventDefault();
            for (var key in this.validateForm3.controls) {
                this.validateForm3.controls[key].markAsDirty();
            }
        };
        this.folderNameAsyncValidator = function (control) {
            var FOLDERname_REGEXP = new RegExp(_this.regular.name.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (FOLDERname_REGEXP.test(control.value) && control.value.length >= 2) {
                return { duplicated: true };
            }
            else if (control.value.length < 2) {
                return { lengthInfo: true };
            }
        }; //数据源名称
        this.folderIpAsyncValidator = function (control) {
            var FOLDERip_REGEXP = new RegExp(_this.regular.ip.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (!FOLDERip_REGEXP.test(control.value) && control.value.length >= 4) {
                return { duplicated: true };
            }
            else if (control.value.length <= 3) {
                return { lengthInfo: true };
            }
        }; //主机ip
        this.folderportAsyncValidator = function (control) {
            var FOLDERport_REGEXP = new RegExp(_this.regular.port.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (!FOLDERport_REGEXP.test(control.value) && control.value.length >= 2) {
                return { duplicated: true, };
            }
            else if (control.value.length < 2) {
                return { lengthInfo: true };
            }
        }; //端口号
        this.folderdatabaseNameAsyncValidator = function (control) {
            var FOLDERname_REGEXP = new RegExp(_this.regular.name.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (FOLDERname_REGEXP.test(control.value) && control.value.length >= 2) {
                return { duplicated: true };
            }
            else if (control.value.length < 2) {
                return { lengthInfo: true };
            }
        }; //数据库名称
        this.folderusernameAsyncValidator = function (control) {
            var FOLDERname_REGEXP = new RegExp(_this.regular.name.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (FOLDERname_REGEXP.test(control.value) && control.value.length >= 2) {
                return { duplicated: true };
            }
            else if (control.value.length < 2) {
                return { lengthInfo: true };
            }
        }; //用户名
        this.folderdataURLresAsyncValidator = function (control) {
            var FOLDERurl_REGEXP = new RegExp(_this.regular.url.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (!FOLDERurl_REGEXP.test(control.value)) {
                return { duplicated: true };
            }
            else if (FOLDERurl_REGEXP.test(control.value) && control.value.length <= 10 && control.value.length > 0) {
                return { lengthInfo: true };
            }
        }; //RESurl
        this.folderdataURLAsyncValidator = function (control) {
            var FOLDERurl_REGEXP = new RegExp(_this.regular.url.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (!FOLDERurl_REGEXP.test(control.value)) {
                return { duplicated: true };
            }
            else if (FOLDERurl_REGEXP.test(control.value) && control.value.length <= 10 && control.value.length > 0) {
                return { lengthInfo: true };
            }
        }; //ELAurl
        this.folderpasswordAsyncValidator = function (control) {
            var FOLDERpassword_REGEXP = new RegExp(_this.regular.url.regexp);
            if (!control.value) {
                return { required: true };
            }
            else if (control.value.length >= 6 && FOLDERpassword_REGEXP.test(control.value)) {
                return { duplicated: true };
            }
            else if (control.value.length < 6) {
                return { lengthInfo: true };
            }
        }; //password
        this.state = true;
        this.single = "JDBC";
        this.singledom = "JDBC";
        this.datasourceTypeList = config_dictionary_1.dictionary.dataSourceType;
        this.versions = config_dictionary_1.dictionary.versionES;
        store.select('formValidator').subscribe(function (data) {
            _this.regular = data;
        });
        this.title = this.route.snapshot.data['title'];
        if (this.route.snapshot.params.id !== undefined) {
            this.title[1]['url'] = "datasource/detail/" + this.route.snapshot.params.id;
            this.title[2]['url'] = "datasource/" + this.route.snapshot.url[0]['path'] + "/" + this.route.snapshot.params.id;
        }
        else {
            this.title[1]['url'] = "datasource/" + this.route.snapshot.url[0]['path'];
        } //面包屑
        if (this.route.snapshot.params.id == undefined) {
            this.disabled = false;
            this.dataURLprefix = "http://";
            this.validateForm = this.fb.group({
                datasourceName: ['', [forms_1.Validators.required, this.folderNameAsyncValidator]],
                datasourceType: ['JDBC', [forms_1.Validators.required]],
                state: ['true', [forms_1.Validators.required]],
                datasourceMatter: [''],
                //  "JDBC"
                dataIP: ['', [forms_1.Validators.required, this.folderIpAsyncValidator]],
                databaseName: ['', [forms_1.Validators.required, this.folderdatabaseNameAsyncValidator]],
                port: ['', [forms_1.Validators.required, this.folderportAsyncValidator]],
                userName: ['', [forms_1.Validators.required, this.folderusernameAsyncValidator]],
                password: ['', [forms_1.Validators.required]],
            });
            this.validateForm1 = this.fb.group({
                datasourceName: ['', [forms_1.Validators.required, this.folderNameAsyncValidator]],
                datasourceType: ['RESTAPI', [forms_1.Validators.required]],
                state: ['true', [forms_1.Validators.required]],
                datasourceMatter: [''],
                // res
                dataURLres: ['', [forms_1.Validators.required]],
                dataURLprefix: ['http://']
            });
            this.validateForm2 = this.fb.group({
                datasourceName: ['', [forms_1.Validators.required, this.folderNameAsyncValidator]],
                datasourceType: ['ELASTICSEARCH', [forms_1.Validators.required]],
                state: ['true', [forms_1.Validators.required]],
                datasourceMatter: [''],
                //ELASTICSEARCH
                versionNumber: ['1', [forms_1.Validators.required]],
                dataURL: ['', [forms_1.Validators.required]],
                dataURLprefix: ['http://']
            });
            this.validateForm3 = this.fb.group({
                datasourceName: ['', [forms_1.Validators.required, this.folderNameAsyncValidator]],
                datasourceType: ['SPARK', [forms_1.Validators.required]],
                state: ['true', [forms_1.Validators.required]],
                datasourceMatter: [''],
                //  "SPARK"
                dataIP: ['', [forms_1.Validators.required, this.folderIpAsyncValidator]],
                databaseName: ['', [forms_1.Validators.required, this.folderdatabaseNameAsyncValidator]],
                databasewarehouse: ['', [forms_1.Validators.required]],
                port: ['', [forms_1.Validators.required, this.folderportAsyncValidator]],
                userName: ['', [forms_1.Validators.required, this.folderusernameAsyncValidator]],
                password: ['', [forms_1.Validators.required]],
            });
        }
        else {
            this.disabled = true;
            this.datasourceCreateService.get(this.route.snapshot.params.id).then(function (response) {
                _this.singledom = response.type;
                _this.single = response.type;
                _this.versionNumber = response.version;
                if (_this.singledom !== "JDBC" && response.url !== null) {
                    _this.url = response.url.split('//');
                }
                else {
                    _this.url = [undefined, undefined];
                }
                _this.datasourceName = response.name;
                _this.validateForm = _this.fb.group({
                    datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                    datasourceType: ['JDBC', [forms_1.Validators.required]],
                    state: ['true', [forms_1.Validators.required]],
                    datasourceMatter: [response.description],
                    //  "JDBC"
                    dataIP: [response.host, [forms_1.Validators.required, _this.folderIpAsyncValidator]],
                    databaseName: [response.database, [forms_1.Validators.required, _this.folderdatabaseNameAsyncValidator]],
                    port: [response.port, [forms_1.Validators.required, _this.folderportAsyncValidator]],
                    userName: [response.userName, [forms_1.Validators.required, _this.folderusernameAsyncValidator]],
                    password: ["*********", [forms_1.Validators.required, _this.folderpasswordAsyncValidator]],
                });
                _this.validateForm1 = _this.fb.group({
                    datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                    datasourceType: ['RESTAPI', [forms_1.Validators.required]],
                    state: ['true', [forms_1.Validators.required]],
                    datasourceMatter: [response.description],
                    // res
                    dataURLres: [_this.url[1] == undefined ? undefined : _this.url[1], [forms_1.Validators.required]],
                    dataURLprefix: [_this.url[0] == undefined ? undefined : _this.url[0] + "//"],
                });
                _this.validateForm2 = _this.fb.group({
                    datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                    datasourceType: ['ELASTICSEARCH', [forms_1.Validators.required]],
                    state: ['true', [forms_1.Validators.required]],
                    datasourceMatter: [response.description],
                    //ELASTICSEARCH
                    versionNumber: [_this.versions[0], [forms_1.Validators.required]],
                    dataURL: [_this.url[1] == undefined ? undefined : _this.url[1], [forms_1.Validators.required]],
                    dataURLprefix: [_this.url[0] == undefined ? undefined : _this.url[0] + "//"]
                });
                _this.validateForm3 = _this.fb.group({
                    datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                    datasourceType: ['SPARK', [forms_1.Validators.required]],
                    state: ['true', [forms_1.Validators.required]],
                    datasourceMatter: [response.description],
                    //  "SPARK"
                    dataIP: [response.host, [forms_1.Validators.required, _this.folderIpAsyncValidator]],
                    databaseName: [response.database, [forms_1.Validators.required, _this.folderdatabaseNameAsyncValidator]],
                    databasewarehouse: [response.sparkDatabase, [forms_1.Validators.required]],
                    port: [response.port, [forms_1.Validators.required, _this.folderportAsyncValidator]],
                    userName: [response.userName, [forms_1.Validators.required, _this.folderusernameAsyncValidator]],
                    password: ["*********", [forms_1.Validators.required, _this.folderpasswordAsyncValidator]],
                });
            }).catch(function (err) {
                _this._message.error("错误", err);
            });
        } //初始化
    }
    DatasourceCreateComponent.prototype.getFormControl = function (name) {
        return this.validateForm.controls[name];
    };
    DatasourceCreateComponent.prototype.getFormControl1 = function (name) {
        return this.validateForm1.controls[name];
    };
    DatasourceCreateComponent.prototype.getFormControl2 = function (name) {
        return this.validateForm2.controls[name];
    };
    DatasourceCreateComponent.prototype.getFormControl3 = function (name) {
        return this.validateForm3.controls[name];
    };
    DatasourceCreateComponent.prototype.backtrack = function () {
        history.back();
    }; //路由返回
    DatasourceCreateComponent.prototype.selectedChange = function (single) {
        if (single) {
            this.singledom = single;
        }
    };
    ;
    DatasourceCreateComponent.prototype.testTheConnection = function () {
        var _this = this;
        var value = this.validateForm.value;
        var value1 = this.validateForm1.value;
        var value2 = this.validateForm2.value;
        var value3 = this.validateForm3.value;
        var obj;
        if (this.singledom == "ELASTICSEARCH") {
            obj = {
                "name": value2.datasourceName,
                "type": value2.datasourceType,
                "version": value2.versionNumber,
                "url": value2.dataURLprefix + value2.dataURL,
                "status": value2.state,
                "description": value2.datasourceMatter
            };
        }
        if (this.singledom == "JDBC") {
            obj = {
                "name": value.datasourceName,
                "type": value.datasourceType,
                "host": value.dataIP,
                "port": value.port,
                "userName": value.userName,
                "password": value.password == "*********" ? null : value.password,
                "database": value.databaseName,
                "status": value.state,
                "description": value.datasourceMatter
            };
        }
        if (this.singledom == "RESTAPI") {
            obj = {
                "name": value1.datasourceName,
                "type": value1.datasourceType,
                "url": value1.dataURLprefix + value1.dataURLres,
                "description": value1.datasourceMatter,
                "status": value1.state
            };
        }
        if (this.singledom == "SPARK") {
            obj = {
                "name": value3.datasourceName,
                "type": value3.datasourceType,
                "host": value3.dataIP,
                "port": value3.port,
                "userName": value3.userName,
                "password": value3.password == "*********" ? null : value3.password,
                "database": value3.databaseName,
                // 
                "status": value3.state,
                "description": value3.datasourceMatter,
                "sparkDatabase": value3.databasewarehouse
            };
        }
        if (this.route.snapshot.params.id !== undefined) {
            obj["id"] = this.route.snapshot.params.id;
            this.datasourceCreateService.test(obj).then(function (response) {
                if (response.success) {
                    return _this._message.success(response.msg, "", _this.datasourceCreateService.msg['notification']['success']);
                }
                else {
                    return _this._message.error(response.msg, "", _this.datasourceCreateService.msg['notification']['error']);
                }
            }).catch(function (err) {
                _this._message.error("错误", err);
            });
        }
        else {
            obj["id"] = null;
            this.datasourceCreateService.test(obj).then(function (response) {
                if (response.success) {
                    return _this._message.success(response.msg, "", _this.datasourceCreateService.msg['notification']['success']);
                }
                else {
                    return _this._message.error(response.msg, "", _this.datasourceCreateService.msg['notification']['error']);
                }
            }).catch(function (err) {
                _this._message.error("错误", err);
            });
        }
    }; //测试点击
    DatasourceCreateComponent.prototype.handleCancelMiddle = function () {
        var _this = this;
        if (this.singledom == "JDBC") {
            this.validateForm.reset();
            setTimeout(function () {
                _this.single = "JDBC";
                _this.state = true;
                if (_this.route.snapshot.params.id !== undefined) {
                    _this.datasourceCreateService.get(_this.route.snapshot.params.id).then(function (response) {
                        _this.single = response.type;
                        _this.validateForm = _this.fb.group({
                            datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                            datasourceType: ['JDBC', [forms_1.Validators.required]],
                            state: ['true', [forms_1.Validators.required]],
                            datasourceMatter: [response.description],
                            //  "JDBC"
                            dataIP: [response.host, [forms_1.Validators.required, _this.folderIpAsyncValidator]],
                            databaseName: [response.database, [forms_1.Validators.required, _this.folderdatabaseNameAsyncValidator]],
                            port: [response.port, [forms_1.Validators.required, _this.folderportAsyncValidator]],
                            userName: [response.userName, [forms_1.Validators.required, _this.folderusernameAsyncValidator]],
                            password: ['******', [forms_1.Validators.required, _this.folderpasswordAsyncValidator]],
                        });
                    }).catch(function (err) {
                        _this._message.error("错误", err);
                    });
                }
            }, 0);
        }
        if (this.singledom == "SPARK") {
            this.validateForm3.reset();
            setTimeout(function () {
                _this.single = "SPARK";
                _this.state = true;
                if (_this.route.snapshot.params.id !== undefined) {
                    _this.datasourceCreateService.get(_this.route.snapshot.params.id).then(function (response) {
                        _this.single = response.type;
                        _this.validateForm3 = _this.fb.group({
                            datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                            datasourceType: ['SPARK', [forms_1.Validators.required]],
                            state: ['true', [forms_1.Validators.required]],
                            datasourceMatter: [response.description],
                            //  "SPARK"
                            dataIP: [response.host, [forms_1.Validators.required, _this.folderIpAsyncValidator]],
                            databaseName: [response.database, [forms_1.Validators.required, _this.folderdatabaseNameAsyncValidator]],
                            databasewarehouse: [response.database, [forms_1.Validators.required]],
                            port: [response.port, [forms_1.Validators.required, _this.folderportAsyncValidator]],
                            userName: [response.userName, [forms_1.Validators.required, _this.folderusernameAsyncValidator]],
                            password: ['******', [forms_1.Validators.required, _this.folderpasswordAsyncValidator]],
                        });
                    }).catch(function (err) {
                        _this._message.error("错误", err);
                    });
                }
            }, 0);
        }
        if (this.singledom == "ELASTICSEARCH") {
            this.validateForm2.reset();
            setTimeout(function () {
                _this.single = "ELASTICSEARCH";
                _this.state = true;
                if (_this.route.snapshot.params.id !== undefined) {
                    _this.datasourceCreateService.get(_this.route.snapshot.params.id).then(function (response) {
                        _this.single = response.type;
                        _this.versionNumber = response.version;
                        _this.validateForm2 = _this.fb.group({
                            datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                            datasourceType: ['ELASTICSEARCH', [forms_1.Validators.required]],
                            state: ['true', [forms_1.Validators.required]],
                            datasourceMatter: [response.description],
                            //ELASTICSEARCH
                            versionNumber: [_this.versions[0], [forms_1.Validators.required]],
                            dataURL: [response.url, [forms_1.Validators.required]]
                        });
                    }).catch(function (err) {
                        _this._message.error("错误", err);
                    });
                }
            }, 0);
        }
        if (this.singledom == "RESTAPI") {
            this.validateForm1.reset();
            setTimeout(function () {
                _this.single = "RESTAPI";
                _this.state = true;
                if (_this.route.snapshot.params.id !== undefined) {
                    _this.datasourceCreateService.get(_this.route.snapshot.params.id).then(function (response) {
                        _this.single = response.type;
                        _this.validateForm1 = _this.fb.group({
                            datasourceName: [response.name, [forms_1.Validators.required, _this.folderNameAsyncValidator]],
                            datasourceType: ['RESTAPI', [forms_1.Validators.required]],
                            state: ['true', [forms_1.Validators.required]],
                            datasourceMatter: [response.description],
                            // res
                            dataURLres: [response.url, [forms_1.Validators.required]],
                        });
                    }).catch(function (err) {
                        _this._message.error("错误", err);
                    });
                }
            }, 0);
        }
    };
    ;
    DatasourceCreateComponent.prototype.saveTheDataSource = function (sure) {
        var _this = this;
        this.datasourceCreateService.hasSaved = true;
        var value = this.validateForm.value;
        var value1 = this.validateForm1.value;
        var value2 = this.validateForm2.value;
        var value3 = this.validateForm3.value;
        var objsure;
        if (this.singledom == "ELASTICSEARCH") {
            objsure = {
                "name": value2.datasourceName,
                "type": value2.datasourceType,
                "url": value2.dataURLprefix + value2.dataURL,
                "version": value2.versionNumber,
                "status": value2.state ? 1 : 0,
                "description": value2.datasourceMatter
            };
        }
        if (this.singledom == "JDBC") {
            objsure = {
                "name": value.datasourceName,
                "type": value.datasourceType,
                "host": value.dataIP,
                "port": value.port,
                "userName": value.userName,
                "password": value.password == "*********" ? null : value.password,
                // "password": value.password,
                "database": value.databaseName,
                "status": value.state ? 1 : 0,
                "description": value.datasourceMatter
            };
        }
        if (this.singledom == "RESTAPI") {
            objsure = {
                "name": value1.datasourceName,
                "type": value1.datasourceType,
                "url": value2.dataURLprefix + value1.dataURLres,
                "status": value1.state ? 1 : 0,
                "description": value1.datasourceMatter
            };
        }
        if (this.singledom == "SPARK") {
            objsure = {
                "name": value3.datasourceName,
                "type": value3.datasourceType,
                "host": value3.dataIP,
                "port": value3.port,
                "userName": value3.userName,
                "password": value3.password == "*********" ? null : value3.password,
                // "password": value.password,
                "database": value3.databaseName,
                //
                "sparkDatabase": value3.databasewarehouse,
                "status": value3.state ? 1 : 0,
                "description": value3.datasourceMatter
            };
        }
        if (this.route.snapshot.params.id !== undefined) {
            objsure["id"] = this.route.snapshot.params.id;
            this.datasourceCreateService.update(objsure).then(function (response) {
                if (JSON.parse(response._body).success) {
                    _this.router.navigate(['/main/datasource/detail', _this.route.snapshot.params.id]);
                    return _this._message.success(JSON.parse(response._body).msg, "", _this.datasourceCreateService.msg['notification']['success']);
                }
                else {
                    return _this._message.error(JSON.parse(response._body).msg, "", _this.datasourceCreateService.msg['notification']['error']);
                }
            }).catch(function (err) {
                _this._message.error("错误", err);
            });
        }
        else {
            this.datasourceCreateService.create(objsure).then(function (response) {
                if (response.success) {
                    _this.router.navigate(['/main/datasource']);
                    return _this._message.success(response.msg, "", _this.datasourceCreateService.msg['notification']['success']);
                }
                else {
                    return _this._message.error(response.msg, "", _this.datasourceCreateService.msg['notification']['error']);
                }
            }).catch(function (err) {
                _this._message.error("错误", err);
            });
        }
    }; //增加数据源//修改数据源
    DatasourceCreateComponent.prototype.ngOnInit = function () {
        this.changeTitle(this.title);
    }; //初始化
    DatasourceCreateComponent.prototype.changeTitle = function (title) {
        var _this = this;
        setTimeout(function () {
            _this.mainService.titleMission(title);
        }, 0);
    };
    DatasourceCreateComponent = __decorate([
        core_1.Component({
            selector: 'datasource-create',
            templateUrl: './datasource-create.component.html',
            styleUrls: ['./datasource-create.component.less'],
            providers: [forms_1.FormBuilder]
        })
    ], DatasourceCreateComponent);
    return DatasourceCreateComponent;
}());
exports.DatasourceCreateComponent = DatasourceCreateComponent;
