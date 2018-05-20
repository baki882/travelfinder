import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    AgenziaTfService,
    AgenziaTfPopupService,
    AgenziaTfComponent,
    AgenziaTfDetailComponent,
    AgenziaTfDialogComponent,
    AgenziaTfPopupComponent,
    AgenziaTfDeletePopupComponent,
    AgenziaTfDeleteDialogComponent,
    agenziaRoute,
    agenziaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...agenziaRoute,
    ...agenziaPopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AgenziaTfComponent,
        AgenziaTfDetailComponent,
        AgenziaTfDialogComponent,
        AgenziaTfDeleteDialogComponent,
        AgenziaTfPopupComponent,
        AgenziaTfDeletePopupComponent,
    ],
    entryComponents: [
        AgenziaTfComponent,
        AgenziaTfDialogComponent,
        AgenziaTfPopupComponent,
        AgenziaTfDeleteDialogComponent,
        AgenziaTfDeletePopupComponent,
    ],
    providers: [
        AgenziaTfService,
        AgenziaTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderAgenziaTfModule {}
