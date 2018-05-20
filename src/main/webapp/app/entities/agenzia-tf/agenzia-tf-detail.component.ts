import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AgenziaTf } from './agenzia-tf.model';
import { AgenziaTfService } from './agenzia-tf.service';

@Component({
    selector: 'jhi-agenzia-tf-detail',
    templateUrl: './agenzia-tf-detail.component.html'
})
export class AgenziaTfDetailComponent implements OnInit, OnDestroy {

    agenzia: AgenziaTf;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private agenziaService: AgenziaTfService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAgenzias();
    }

    load(id) {
        this.agenziaService.find(id)
            .subscribe((agenziaResponse: HttpResponse<AgenziaTf>) => {
                this.agenzia = agenziaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAgenzias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'agenziaListModification',
            (response) => this.load(this.agenzia.id)
        );
    }
}
