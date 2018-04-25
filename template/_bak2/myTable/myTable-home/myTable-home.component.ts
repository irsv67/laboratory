import { Component, OnInit,  OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main.service';

@Component({
    selector: 'myTable-home',
    templateUrl: './myTable-home.component.html',
    styleUrls: ['./myTable-home.component.less']
})
export class MyTableHomeComponent implements OnInit, OnDestroy {

    title:Array<any>;
    constructor(private route:ActivatedRoute, private mainService:MainService) {
        this.title = this.route.snapshot.data['title'];
    }

    ngOnInit() {
       this.changeTitle(this.title);
        
    }

    changeTitle(title:Array<any>){
        setTimeout(() => {
            this.mainService.titleMission(title);
        }, 0);
    }


    ngOnDestroy() {

    }
}
