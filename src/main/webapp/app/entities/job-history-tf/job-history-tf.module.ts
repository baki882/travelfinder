import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    JobHistoryTfService,
    JobHistoryTfPopupService,
    JobHistoryTfComponent,
    JobHistoryTfDetailComponent,
    JobHistoryTfDialogComponent,
    JobHistoryTfPopupComponent,
    JobHistoryTfDeletePopupComponent,
    JobHistoryTfDeleteDialogComponent,
    jobHistoryRoute,
    jobHistoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobHistoryRoute,
    ...jobHistoryPopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobHistoryTfComponent,
        JobHistoryTfDetailComponent,
        JobHistoryTfDialogComponent,
        JobHistoryTfDeleteDialogComponent,
        JobHistoryTfPopupComponent,
        JobHistoryTfDeletePopupComponent,
    ],
    entryComponents: [
        JobHistoryTfComponent,
        JobHistoryTfDialogComponent,
        JobHistoryTfPopupComponent,
        JobHistoryTfDeleteDialogComponent,
        JobHistoryTfDeletePopupComponent,
    ],
    providers: [
        JobHistoryTfService,
        JobHistoryTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderJobHistoryTfModule {}
