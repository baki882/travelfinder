import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DepartmentTf } from './department-tf.model';
import { DepartmentTfService } from './department-tf.service';

@Component({
    selector: 'jhi-department-tf-detail',
    templateUrl: './department-tf-detail.component.html'
})
export class DepartmentTfDetailComponent implements OnInit, OnDestroy {

    department: DepartmentTf;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private departmentService: DepartmentTfService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDepartments();
    }

    load(id) {
        this.departmentService.find(id)
            .subscribe((departmentResponse: HttpResponse<DepartmentTf>) => {
                this.department = departmentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDepartments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'departmentListModification',
            (response) => this.load(this.department.id)
        );
    }
}
