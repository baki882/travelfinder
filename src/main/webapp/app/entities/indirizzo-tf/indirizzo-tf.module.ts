import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    IndirizzoTfService,
    IndirizzoTfPopupService,
    IndirizzoTfComponent,
    IndirizzoTfDetailComponent,
    IndirizzoTfDialogComponent,
    IndirizzoTfPopupComponent,
    IndirizzoTfDeletePopupComponent,
    IndirizzoTfDeleteDialogComponent,
    indirizzoRoute,
    indirizzoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...indirizzoRoute,
    ...indirizzoPopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        IndirizzoTfComponent,
        IndirizzoTfDetailComponent,
        IndirizzoTfDialogComponent,
        IndirizzoTfDeleteDialogComponent,
        IndirizzoTfPopupComponent,
        IndirizzoTfDeletePopupComponent,
    ],
    entryComponents: [
        IndirizzoTfComponent,
        IndirizzoTfDialogComponent,
        IndirizzoTfPopupComponent,
        IndirizzoTfDeleteDialogComponent,
        IndirizzoTfDeletePopupComponent,
    ],
    providers: [
        IndirizzoTfService,
        IndirizzoTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderIndirizzoTfModule {}
