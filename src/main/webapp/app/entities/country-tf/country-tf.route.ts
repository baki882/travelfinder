import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CountryTfComponent } from './country-tf.component';
import { CountryTfDetailComponent } from './country-tf-detail.component';
import { CountryTfPopupComponent } from './country-tf-dialog.component';
import { CountryTfDeletePopupComponent } from './country-tf-delete-dialog.component';

export const countryRoute: Routes = [
    {
        path: 'country-tf',
        component: CountryTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'country-tf/:id',
        component: CountryTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country-tf-new',
        component: CountryTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-tf/:id/edit',
        component: CountryTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-tf/:id/delete',
        component: CountryTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
