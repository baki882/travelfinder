import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    TaskTfService,
    TaskTfPopupService,
    TaskTfComponent,
    TaskTfDetailComponent,
    TaskTfDialogComponent,
    TaskTfPopupComponent,
    TaskTfDeletePopupComponent,
    TaskTfDeleteDialogComponent,
    taskRoute,
    taskPopupRoute,
} from './';

const ENTITY_STATES = [
    ...taskRoute,
    ...taskPopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TaskTfComponent,
        TaskTfDetailComponent,
        TaskTfDialogComponent,
        TaskTfDeleteDialogComponent,
        TaskTfPopupComponent,
        TaskTfDeletePopupComponent,
    ],
    entryComponents: [
        TaskTfComponent,
        TaskTfDialogComponent,
        TaskTfPopupComponent,
        TaskTfDeleteDialogComponent,
        TaskTfDeletePopupComponent,
    ],
    providers: [
        TaskTfService,
        TaskTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderTaskTfModule {}
