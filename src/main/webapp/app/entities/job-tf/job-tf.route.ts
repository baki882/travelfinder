import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JobTfComponent } from './job-tf.component';
import { JobTfDetailComponent } from './job-tf-detail.component';
import { JobTfPopupComponent } from './job-tf-dialog.component';
import { JobTfDeletePopupComponent } from './job-tf-delete-dialog.component';

export const jobRoute: Routes = [
    {
        path: 'job-tf',
        component: JobTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'job-tf/:id',
        component: JobTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.job.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobPopupRoute: Routes = [
    {
        path: 'job-tf-new',
        component: JobTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-tf/:id/edit',
        component: JobTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-tf/:id/delete',
        component: JobTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.job.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
