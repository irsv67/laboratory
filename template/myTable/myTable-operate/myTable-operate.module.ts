import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyTableOperateService } from './myTable-operate.service';
import { MyTableOperateComponent } from './myTable-operate.component';


import { ButtonModule } from 'ng-cosmos-td-ui/src/base/button/button.module';

@NgModule({
    declarations: [
        MyTableOperateComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        CommonModule,
        ButtonModule
    ],
    providers: [MyTableOperateService],
    exports: [MyTableOperateComponent]
})
export class MyTableOperateModule {

}
