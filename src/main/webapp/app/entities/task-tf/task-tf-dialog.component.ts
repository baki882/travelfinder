import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TaskTf } from './task-tf.model';
import { TaskTfPopupService } from './task-tf-popup.service';
import { TaskTfService } from './task-tf.service';

@Component({
    selector: 'jhi-task-tf-dialog',
    templateUrl: './task-tf-dialog.component.html'
})
export class TaskTfDialogComponent implements OnInit {

    task: TaskTf;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private taskService: TaskTfService,
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
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(
                this.taskService.create(this.task));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TaskTf>>) {
        result.subscribe((res: HttpResponse<TaskTf>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TaskTf) {
        this.eventManager.broadcast({ name: 'taskListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-task-tf-popup',
    template: ''
})
export class TaskTfPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taskPopupService: TaskTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.taskPopupService
                    .open(TaskTfDialogComponent as Component, params['id']);
            } else {
                this.taskPopupService
                    .open(TaskTfDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
