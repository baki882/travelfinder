import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DepartmentTf } from './department-tf.model';
import { DepartmentTfPopupService } from './department-tf-popup.service';
import { DepartmentTfService } from './department-tf.service';

@Component({
    selector: 'jhi-department-tf-dialog',
    templateUrl: './department-tf-dialog.component.html'
})
export class DepartmentTfDialogComponent implements OnInit {

    department: DepartmentTf;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private departmentService: DepartmentTfService,
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
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(
                this.departmentService.update(this.department));
        } else {
            this.subscribeToSaveResponse(
                this.departmentService.create(this.department));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DepartmentTf>>) {
        result.subscribe((res: HttpResponse<DepartmentTf>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DepartmentTf) {
        this.eventManager.broadcast({ name: 'departmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-department-tf-popup',
    template: ''
})
export class DepartmentTfPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentPopupService: DepartmentTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.departmentPopupService
                    .open(DepartmentTfDialogComponent as Component, params['id']);
            } else {
                this.departmentPopupService
                    .open(DepartmentTfDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
