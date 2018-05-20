import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobHistoryTf } from './job-history-tf.model';
import { JobHistoryTfPopupService } from './job-history-tf-popup.service';
import { JobHistoryTfService } from './job-history-tf.service';

@Component({
    selector: 'jhi-job-history-tf-dialog',
    templateUrl: './job-history-tf-dialog.component.html'
})
export class JobHistoryTfDialogComponent implements OnInit {

    jobHistory: JobHistoryTf;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jobHistoryService: JobHistoryTfService,
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
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(
                this.jobHistoryService.create(this.jobHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobHistoryTf>>) {
        result.subscribe((res: HttpResponse<JobHistoryTf>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: JobHistoryTf) {
        this.eventManager.broadcast({ name: 'jobHistoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-job-history-tf-popup',
    template: ''
})
export class JobHistoryTfPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobHistoryPopupService: JobHistoryTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jobHistoryPopupService
                    .open(JobHistoryTfDialogComponent as Component, params['id']);
            } else {
                this.jobHistoryPopupService
                    .open(JobHistoryTfDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
