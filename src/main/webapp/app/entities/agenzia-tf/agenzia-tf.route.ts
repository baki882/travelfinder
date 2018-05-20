import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AgenziaTfComponent } from './agenzia-tf.component';
import { AgenziaTfDetailComponent } from './agenzia-tf-detail.component';
import { AgenziaTfPopupComponent } from './agenzia-tf-dialog.component';
import { AgenziaTfDeletePopupComponent } from './agenzia-tf-delete-dialog.component';

export const agenziaRoute: Routes = [
    {
        path: 'agenzia-tf',
        component: AgenziaTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.agenzia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'agenzia-tf/:id',
        component: AgenziaTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.agenzia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agenziaPopupRoute: Routes = [
    {
        path: 'agenzia-tf-new',
        component: AgenziaTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.agenzia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agenzia-tf/:id/edit',
        component: AgenziaTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.agenzia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agenzia-tf/:id/delete',
        component: AgenziaTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.agenzia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
