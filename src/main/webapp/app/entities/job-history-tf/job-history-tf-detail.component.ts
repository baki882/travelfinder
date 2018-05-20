import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobHistoryTf } from './job-history-tf.model';
import { JobHistoryTfService } from './job-history-tf.service';

@Component({
    selector: 'jhi-job-history-tf-detail',
    templateUrl: './job-history-tf-detail.component.html'
})
export class JobHistoryTfDetailComponent implements OnInit, OnDestroy {

    jobHistory: JobHistoryTf;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobHistoryService: JobHistoryTfService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobHistories();
    }

    load(id) {
        this.jobHistoryService.find(id)
            .subscribe((jobHistoryResponse: HttpResponse<JobHistoryTf>) => {
                this.jobHistory = jobHistoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobHistories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobHistoryListModification',
            (response) => this.load(this.jobHistory.id)
        );
    }
}
