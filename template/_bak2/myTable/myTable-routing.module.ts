import { MyTableComponent } from './myTable.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTableHomeComponent } from './myTable-home/myTable-home.component';
import { MyTableCreateComponent } from './myTable-create/myTable-create.component';
import { MyTableDetailComponent } from './myTable-detail/myTable-detail.component';

const routes: Routes = [{
    path: '',
    component: MyTableComponent,
    children: [
        {
            path: '',
            component: MyTableHomeComponent,
            data: {
                'title': [
                    { 'name': '数据源管理', 'url': 'myTable' }
                ]
            }
        },
        {
            path: 'create',
            component: MyTableCreateComponent,
            data: {
                'title': [
                    { 'name': '数据源管理', 'url': 'myTable' },
                    { 'name': '新增数据源', 'url': '' }
                ],
            },
            // canDeactivate: [ MyTableProvide ]
        },
        {
            path: 'modify/:id',
            component: MyTableCreateComponent,
            data: {
                'title': [
                    { 'name': '数据源管理', 'url': 'myTable' },
                    { 'name': '数据源详情', 'url': '' },
                    { 'name': '修改数据源', 'url': '' }

                ]
            },
            // canDeactivate: [ MyTableProvide ]
        },
        {
            path: 'detail/:id',
            component: MyTableDetailComponent,
            data: {
                'title': [
                    { 'name': '数据源管理', 'url': 'myTable' },
                    { 'name': '数据源详情', 'url': '' }
                ]
            }
        },
    ]
}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class MyTableRoutingModule {

}
