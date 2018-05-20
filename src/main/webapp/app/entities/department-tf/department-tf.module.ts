import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    DepartmentTfService,
    DepartmentTfPopupService,
    DepartmentTfComponent,
    DepartmentTfDetailComponent,
    DepartmentTfDialogComponent,
    DepartmentTfPopupComponent,
    DepartmentTfDeletePopupComponent,
    DepartmentTfDeleteDialogComponent,
    departmentRoute,
    departmentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...departmentRoute,
    ...departmentPopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DepartmentTfComponent,
        DepartmentTfDetailComponent,
        DepartmentTfDialogComponent,
        DepartmentTfDeleteDialogComponent,
        DepartmentTfPopupComponent,
        DepartmentTfDeletePopupComponent,
    ],
    entryComponents: [
        DepartmentTfComponent,
        DepartmentTfDialogComponent,
        DepartmentTfPopupComponent,
        DepartmentTfDeleteDialogComponent,
        DepartmentTfDeletePopupComponent,
    ],
    providers: [
        DepartmentTfService,
        DepartmentTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderDepartmentTfModule {}
