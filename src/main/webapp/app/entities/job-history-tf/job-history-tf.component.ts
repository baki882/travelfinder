import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobHistoryTf } from './job-history-tf.model';
import { JobHistoryTfService } from './job-history-tf.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-job-history-tf',
    templateUrl: './job-history-tf.component.html'
})
export class JobHistoryTfComponent implements OnInit, OnDestroy {
jobHistories: JobHistoryTf[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jobHistoryService: JobHistoryTfService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jobHistoryService.query().subscribe(
            (res: HttpResponse<JobHistoryTf[]>) => {
                this.jobHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJobHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JobHistoryTf) {
        return item.id;
    }
    registerChangeInJobHistories() {
        this.eventSubscriber = this.eventManager.subscribe('jobHistoryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
