import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobTf } from './job-tf.model';
import { JobTfService } from './job-tf.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-job-tf',
    templateUrl: './job-tf.component.html'
})
export class JobTfComponent implements OnInit, OnDestroy {
jobs: JobTf[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jobService: JobTfService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.jobService.query().subscribe(
            (res: HttpResponse<JobTf[]>) => {
                this.jobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInJobs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: JobTf) {
        return item.id;
    }
    registerChangeInJobs() {
        this.eventSubscriber = this.eventManager.subscribe('jobListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
