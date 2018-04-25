import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from '../../main.service';
import { Observable } from 'rxjs';

import { MyTableDetailService } from './myTable-detail.service';
import { CmNotificationService } from 'ng-cosmos-td-ui';


@Component({
    selector: 'myTable-detail',
    templateUrl: './myTable-detail.component.html',
    styleUrls: ['./myTable-detail.component.less'],
    providers: [FormBuilder]
})
export class MyTableDetailComponent implements OnInit, OnDestroy {
    title: Array<any>;
    metadataId: any;
    id: number;
    myTableDeta: any = {};//数据源详情
    status: any;
    validateForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private mainService: MainService,
        private myTableDetailService: MyTableDetailService,
        private _notification: CmNotificationService
    ) {
        this.id = this.route.snapshot.params.id;

        this.metadataId = this.route.params['value']['id'];

        this.title = this.route.snapshot.data['title'];

        this.title[1]['url'] = `myTable/${this.route.snapshot.url[0]['path']}/${this.metadataId}`;

        this.validateForm = this.fb.group({
            state: [''],
        })

    }

    ngOnInit() {
        this.changeTitle(this.title);
        this.myTableDetailService.get(this.id).then((response: any) => {
            this.myTableDeta = response;
            this.status = this.myTableDeta.status == "1" ? true : false;
        }).catch((err: any) => {
            this._notification.error("错误", err);
        });

    }
    ngOnDestroy() {

    }

    getFormControl(name: any) {
        return this.validateForm.controls[name];
    }

    changeTitle(title: Array<any>) {
        setTimeout(() => {
            this.mainService.titleMission(title);
        }, 0);
    }
}
