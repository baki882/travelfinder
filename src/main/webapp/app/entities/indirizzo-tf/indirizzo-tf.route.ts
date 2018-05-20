import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { IndirizzoTfComponent } from './indirizzo-tf.component';
import { IndirizzoTfDetailComponent } from './indirizzo-tf-detail.component';
import { IndirizzoTfPopupComponent } from './indirizzo-tf-dialog.component';
import { IndirizzoTfDeletePopupComponent } from './indirizzo-tf-delete-dialog.component';

export const indirizzoRoute: Routes = [
    {
        path: 'indirizzo-tf',
        component: IndirizzoTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.indirizzo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'indirizzo-tf/:id',
        component: IndirizzoTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.indirizzo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const indirizzoPopupRoute: Routes = [
    {
        path: 'indirizzo-tf-new',
        component: IndirizzoTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.indirizzo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indirizzo-tf/:id/edit',
        component: IndirizzoTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.indirizzo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'indirizzo-tf/:id/delete',
        component: IndirizzoTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.indirizzo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
