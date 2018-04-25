import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyTableListService } from './myTable-list.service';
import { MyTableListComponent } from './myTable-list.component';
import { PipeModule } from '../../../pipes/pipe.module';

import { TableModule } from 'ng-cosmos-td-ui/src/base/table/table.module';

@NgModule({
    declarations: [
        MyTableListComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        CommonModule,
        TableModule,
        PipeModule
    ],
    providers: [MyTableListComponent,MyTableListService],
    exports: [MyTableListComponent]
})
export class MyTableListModule {

}
