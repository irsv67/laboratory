import { NgModule } from '@angular/core';
import { MyTableCreateService } from './myTable-create.service';
import { MyTableCreateComponent } from './myTable-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwitchModule } from 'ng-cosmos-td-ui/src/base/switch/switch.module';
import { InputModule } from 'ng-cosmos-td-ui/src/base/input/input.module';
import { ButtonModule } from 'ng-cosmos-td-ui/src/base/button/button.module';
import { FormModule } from 'ng-cosmos-td-ui/src/base/form/form.module';
import { SelectModule } from 'ng-cosmos-td-ui/src/base/select/select.module';

@NgModule({
    declarations: [
        MyTableCreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        SwitchModule,
        InputModule,
        ButtonModule,
        FormModule,
        SelectModule
    ],
    providers: [MyTableCreateService],
    exports: [MyTableCreateComponent]
})
export class MyTableCreateModule {

}
