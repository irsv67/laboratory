import { MyTableDetailModule } from './myTable-detail/myTable-detail.module';
import { MyTableCreateModule } from './myTable-create/myTable-create.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyTableComponent } from './myTable.component';
import { MyTableRoutingModule } from './myTable-routing.module';
import { MyTableHomeModule } from './myTable-home/myTable-home.module';


@NgModule({
    declarations: [
        MyTableComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        MyTableRoutingModule,
        MyTableHomeModule,
        MyTableCreateModule,
        MyTableDetailModule
    ],
    exports: [MyTableComponent]
})
export class MyTableModule {

}
