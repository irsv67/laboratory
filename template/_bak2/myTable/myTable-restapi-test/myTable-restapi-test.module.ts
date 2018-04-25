import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyTableRestapiTestService } from './myTable-restapi-test.service';
import { myTableRestapiTestComponent } from './myTable-restapi-test.component';
import { FormsModule } from '@angular/forms';

import { FormModule } from 'ng-cosmos-td-ui/src/base/form/form.module';
import { ModalModule } from 'ng-cosmos-td-ui/src/base/modal/modal.module';

@NgModule({
    declarations: [
        myTableRestapiTestComponent
    ],
    imports: [
        FormsModule,
        CommonModule, 
        FormModule,       
        ModalModule
    ],
    providers: [MyTableRestapiTestService],
    exports: [myTableRestapiTestComponent]
})
export class MyTableRestapiTestModule {

}
