import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TaskTf } from './task-tf.model';
import { TaskTfService } from './task-tf.service';

@Component({
    selector: 'jhi-task-tf-detail',
    templateUrl: './task-tf-detail.component.html'
})
export class TaskTfDetailComponent implements OnInit, OnDestroy {

    task: TaskTf;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private taskService: TaskTfService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTasks();
    }

    load(id) {
        this.taskService.find(id)
            .subscribe((taskResponse: HttpResponse<TaskTf>) => {
                this.task = taskResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taskListModification',
            (response) => this.load(this.task.id)
        );
    }
}
