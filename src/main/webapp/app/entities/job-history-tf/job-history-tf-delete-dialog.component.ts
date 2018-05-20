import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobHistoryTf } from './job-history-tf.model';
import { JobHistoryTfPopupService } from './job-history-tf-popup.service';
import { JobHistoryTfService } from './job-history-tf.service';

@Component({
    selector: 'jhi-job-history-tf-delete-dialog',
    templateUrl: './job-history-tf-delete-dialog.component.html'
})
export class JobHistoryTfDeleteDialogComponent {

    jobHistory: JobHistoryTf;

    constructor(
        private jobHistoryService: JobHistoryTfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobHistoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jobHistoryListModification',
                content: 'Deleted an jobHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-history-tf-delete-popup',
    template: ''
})
export class JobHistoryTfDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jobHistoryPopupService: JobHistoryTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jobHistoryPopupService
                .open(JobHistoryTfDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
