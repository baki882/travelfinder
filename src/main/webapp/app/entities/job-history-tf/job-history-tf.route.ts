import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JobHistoryTfComponent } from './job-history-tf.component';
import { JobHistoryTfDetailComponent } from './job-history-tf-detail.component';
import { JobHistoryTfPopupComponent } from './job-history-tf-dialog.component';
import { JobHistoryTfDeletePopupComponent } from './job-history-tf-delete-dialog.component';

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history-tf',
        component: JobHistoryTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'job-history-tf/:id',
        component: JobHistoryTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history-tf-new',
        component: JobHistoryTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history-tf/:id/edit',
        component: JobHistoryTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history-tf/:id/delete',
        component: JobHistoryTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
