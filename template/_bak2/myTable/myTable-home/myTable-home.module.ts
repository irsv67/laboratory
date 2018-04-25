import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyTableHomeComponent } from './myTable-home.component';
//子模块
import { MyTableListModule } from '../myTable-list/myTable-list.module';
import { MyTableOperateModule } from '../myTable-operate/myTable-operate.module';
import { MyTableDetailModule } from '../myTable-detail/myTable-detail.module';
import { MyTableSearchModule } from '../myTable-search/myTable-search.module';
import {MyTableHomeService} from '../myTable-home/myTable-home.service'
@NgModule({
    declarations: [
        MyTableHomeComponent
    ],
    imports: [
        FormsModule,
        CommonModule,

    //    子模块
        MyTableListModule,
        MyTableOperateModule,
        MyTableDetailModule,
        MyTableSearchModule
    ],
    providers:[MyTableHomeService],
    exports: [MyTableHomeComponent]
})
export class MyTableHomeModule{

}
