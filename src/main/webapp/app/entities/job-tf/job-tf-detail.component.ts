import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobTf } from './job-tf.model';
import { JobTfService } from './job-tf.service';

@Component({
    selector: 'jhi-job-tf-detail',
    templateUrl: './job-tf-detail.component.html'
})
export class JobTfDetailComponent implements OnInit, OnDestroy {

    job: JobTf;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobService: JobTfService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInJobs();
    }

    load(id) {
        this.jobService.find(id)
            .subscribe((jobResponse: HttpResponse<JobTf>) => {
                this.job = jobResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'jobListModification',
            (response) => this.load(this.job.id)
        );
    }
}
