import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TaskTfComponent } from './task-tf.component';
import { TaskTfDetailComponent } from './task-tf-detail.component';
import { TaskTfPopupComponent } from './task-tf-dialog.component';
import { TaskTfDeletePopupComponent } from './task-tf-delete-dialog.component';

export const taskRoute: Routes = [
    {
        path: 'task-tf',
        component: TaskTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'task-tf/:id',
        component: TaskTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.task.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskPopupRoute: Routes = [
    {
        path: 'task-tf-new',
        component: TaskTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-tf/:id/edit',
        component: TaskTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'task-tf/:id/delete',
        component: TaskTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.task.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
