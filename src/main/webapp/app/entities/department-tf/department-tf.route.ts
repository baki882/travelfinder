import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DepartmentTfComponent } from './department-tf.component';
import { DepartmentTfDetailComponent } from './department-tf-detail.component';
import { DepartmentTfPopupComponent } from './department-tf-dialog.component';
import { DepartmentTfDeletePopupComponent } from './department-tf-delete-dialog.component';

export const departmentRoute: Routes = [
    {
        path: 'department-tf',
        component: DepartmentTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'department-tf/:id',
        component: DepartmentTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.department.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentPopupRoute: Routes = [
    {
        path: 'department-tf-new',
        component: DepartmentTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-tf/:id/edit',
        component: DepartmentTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-tf/:id/delete',
        component: DepartmentTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.department.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
