import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
    selector: 'myTable-operate',
    templateUrl: './myTable-operate.component.html',
    styleUrls: ['./myTable-operate.component.less']
})
export class MyTableOperateComponent implements OnInit, OnDestroy {
    _dataSet: any = [];

    ngOnInit() {
    }
    constructor(
    ) {     
    }   
    ngOnDestroy() {

    }

}
