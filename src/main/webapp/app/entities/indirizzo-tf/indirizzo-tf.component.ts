import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndirizzoTf } from './indirizzo-tf.model';
import { IndirizzoTfService } from './indirizzo-tf.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-indirizzo-tf',
    templateUrl: './indirizzo-tf.component.html'
})
export class IndirizzoTfComponent implements OnInit, OnDestroy {
indirizzos: IndirizzoTf[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private indirizzoService: IndirizzoTfService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.indirizzoService.query().subscribe(
            (res: HttpResponse<IndirizzoTf[]>) => {
                this.indirizzos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIndirizzos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IndirizzoTf) {
        return item.id;
    }
    registerChangeInIndirizzos() {
        this.eventSubscriber = this.eventManager.subscribe('indirizzoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
