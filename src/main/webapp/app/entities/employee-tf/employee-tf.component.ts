import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeeTf } from './employee-tf.model';
import { EmployeeTfService } from './employee-tf.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-employee-tf',
    templateUrl: './employee-tf.component.html'
})
export class EmployeeTfComponent implements OnInit, OnDestroy {
employees: EmployeeTf[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private employeeService: EmployeeTfService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.employeeService.query().subscribe(
            (res: HttpResponse<EmployeeTf[]>) => {
                this.employees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EmployeeTf) {
        return item.id;
    }
    registerChangeInEmployees() {
        this.eventSubscriber = this.eventManager.subscribe('employeeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
