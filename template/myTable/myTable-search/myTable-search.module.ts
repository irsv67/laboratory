import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MyTableSearchService } from './myTable-search.service';
import { MyTableSearchComponent } from './myTable-search.component';


import { InputModule } from 'ng-cosmos-td-ui/src/base/input/input.module';
import { ButtonModule } from 'ng-cosmos-td-ui/src/base/button/button.module';
import { FormModule } from 'ng-cosmos-td-ui/src/base/form/form.module';
import { SelectModule } from 'ng-cosmos-td-ui/src/base/select/select.module';

@NgModule({
    declarations: [
        MyTableSearchComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        InputModule,
        ButtonModule,
        FormModule,
        SelectModule
    ],
    providers: [MyTableSearchService],
    exports: [MyTableSearchComponent]
})
export class MyTableSearchModule {

}
