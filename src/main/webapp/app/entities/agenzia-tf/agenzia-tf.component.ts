import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AgenziaTf } from './agenzia-tf.model';
import { AgenziaTfService } from './agenzia-tf.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-agenzia-tf',
    templateUrl: './agenzia-tf.component.html'
})
export class AgenziaTfComponent implements OnInit, OnDestroy {
agenzias: AgenziaTf[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agenziaService: AgenziaTfService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.agenziaService.query().subscribe(
            (res: HttpResponse<AgenziaTf[]>) => {
                this.agenzias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAgenzias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AgenziaTf) {
        return item.id;
    }
    registerChangeInAgenzias() {
        this.eventSubscriber = this.eventManager.subscribe('agenziaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
