import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    JobTfService,
    JobTfPopupService,
    JobTfComponent,
    JobTfDetailComponent,
    JobTfDialogComponent,
    JobTfPopupComponent,
    JobTfDeletePopupComponent,
    JobTfDeleteDialogComponent,
    jobRoute,
    jobPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jobRoute,
    ...jobPopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JobTfComponent,
        JobTfDetailComponent,
        JobTfDialogComponent,
        JobTfDeleteDialogComponent,
        JobTfPopupComponent,
        JobTfDeletePopupComponent,
    ],
    entryComponents: [
        JobTfComponent,
        JobTfDialogComponent,
        JobTfPopupComponent,
        JobTfDeleteDialogComponent,
        JobTfDeletePopupComponent,
    ],
    providers: [
        JobTfService,
        JobTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderJobTfModule {}
