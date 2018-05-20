import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EmployeeTfComponent } from './employee-tf.component';
import { EmployeeTfDetailComponent } from './employee-tf-detail.component';
import { EmployeeTfPopupComponent } from './employee-tf-dialog.component';
import { EmployeeTfDeletePopupComponent } from './employee-tf-delete-dialog.component';

export const employeeRoute: Routes = [
    {
        path: 'employee-tf',
        component: EmployeeTfComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'employee-tf/:id',
        component: EmployeeTfDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employeePopupRoute: Routes = [
    {
        path: 'employee-tf-new',
        component: EmployeeTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-tf/:id/edit',
        component: EmployeeTfPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'employee-tf/:id/delete',
        component: EmployeeTfDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'travelfinderApp.employee.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
