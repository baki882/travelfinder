import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { IndirizzoTf } from './indirizzo-tf.model';
import { IndirizzoTfService } from './indirizzo-tf.service';

@Component({
    selector: 'jhi-indirizzo-tf-detail',
    templateUrl: './indirizzo-tf-detail.component.html'
})
export class IndirizzoTfDetailComponent implements OnInit, OnDestroy {

    indirizzo: IndirizzoTf;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private indirizzoService: IndirizzoTfService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIndirizzos();
    }

    load(id) {
        this.indirizzoService.find(id)
            .subscribe((indirizzoResponse: HttpResponse<IndirizzoTf>) => {
                this.indirizzo = indirizzoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIndirizzos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'indirizzoListModification',
            (response) => this.load(this.indirizzo.id)
        );
    }
}
