import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TravelfinderSharedModule } from '../../shared';
import {
    CountryTfService,
    CountryTfPopupService,
    CountryTfComponent,
    CountryTfDetailComponent,
    CountryTfDialogComponent,
    CountryTfPopupComponent,
    CountryTfDeletePopupComponent,
    CountryTfDeleteDialogComponent,
    countryRoute,
    countryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        TravelfinderSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CountryTfComponent,
        CountryTfDetailComponent,
        CountryTfDialogComponent,
        CountryTfDeleteDialogComponent,
        CountryTfPopupComponent,
        CountryTfDeletePopupComponent,
    ],
    entryComponents: [
        CountryTfComponent,
        CountryTfDialogComponent,
        CountryTfPopupComponent,
        CountryTfDeleteDialogComponent,
        CountryTfDeletePopupComponent,
    ],
    providers: [
        CountryTfService,
        CountryTfPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderCountryTfModule {}
