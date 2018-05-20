import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeTf } from './employee-tf.model';
import { EmployeeTfPopupService } from './employee-tf-popup.service';
import { EmployeeTfService } from './employee-tf.service';

@Component({
    selector: 'jhi-employee-tf-dialog',
    templateUrl: './employee-tf-dialog.component.html'
})
export class EmployeeTfDialogComponent implements OnInit {

    employee: EmployeeTf;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private employeeService: EmployeeTfService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(
                this.employeeService.create(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmployeeTf>>) {
        result.subscribe((res: HttpResponse<EmployeeTf>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmployeeTf) {
        this.eventManager.broadcast({ name: 'employeeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-employee-tf-popup',
    template: ''
})
export class EmployeeTfPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeePopupService: EmployeeTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employeePopupService
                    .open(EmployeeTfDialogComponent as Component, params['id']);
            } else {
                this.employeePopupService
                    .open(EmployeeTfDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
