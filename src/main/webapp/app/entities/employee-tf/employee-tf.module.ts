import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    EmployeeTfService,
    EmployeeTfPopupService,
    EmployeeTfComponent,
    EmployeeTfDetailComponent,
    EmployeeTfDialogComponent,
    EmployeeTfPopupComponent,
    EmployeeTfDeletePopupComponent,
    EmployeeTfDeleteDialogComponent,
    employeeRoute,
    employeePopupRoute,
} from './';

const ENTITY_STATES = [
    ...employeeRoute,
    ...employeePopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EmployeeTfComponent,
        EmployeeTfDetailComponent,
        EmployeeTfDialogComponent,
        EmployeeTfDeleteDialogComponent,
        EmployeeTfPopupComponent,
        EmployeeTfDeletePopupComponent,
    ],
    entryComponents: [
        EmployeeTfComponent,
        EmployeeTfDialogComponent,
        EmployeeTfPopupComponent,
        EmployeeTfDeleteDialogComponent,
        EmployeeTfDeletePopupComponent,
    ],
    providers: [
        EmployeeTfService,
        EmployeeTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderEmployeeTfModule {}
