import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyTableDetailService } from './myTable-detail.service';
import { MyTableDetailComponent } from './myTable-detail.component';

import { FormModule } from 'ng-cosmos-td-ui/src/base/form/form.module';
import { ButtonModule } from 'ng-cosmos-td-ui/src/base/button/button.module';

@NgModule({
    declarations: [
        MyTableDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        FormModule,
        ButtonModule,
        ReactiveFormsModule
    ],
    providers: [MyTableDetailService],
    exports: [MyTableDetailComponent]
})
export class MyTableDetailModule {

}
