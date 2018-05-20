import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IndirizzoTf } from './indirizzo-tf.model';
import { IndirizzoTfPopupService } from './indirizzo-tf-popup.service';
import { IndirizzoTfService } from './indirizzo-tf.service';
import { AgenziaTf, AgenziaTfService } from '../agenzia-tf';

@Component({
    selector: 'jhi-indirizzo-tf-dialog',
    templateUrl: './indirizzo-tf-dialog.component.html'
})
export class IndirizzoTfDialogComponent implements OnInit {

    indirizzo: IndirizzoTf;
    isSaving: boolean;

    agenzias: AgenziaTf[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private indirizzoService: IndirizzoTfService,
        private agenziaService: AgenziaTfService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.agenziaService.query()
            .subscribe((res: HttpResponse<AgenziaTf[]>) => { this.agenzias = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.indirizzo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.indirizzoService.update(this.indirizzo));
        } else {
            this.subscribeToSaveResponse(
                this.indirizzoService.create(this.indirizzo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IndirizzoTf>>) {
        result.subscribe((res: HttpResponse<IndirizzoTf>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IndirizzoTf) {
        this.eventManager.broadcast({ name: 'indirizzoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAgenziaById(index: number, item: AgenziaTf) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-indirizzo-tf-popup',
    template: ''
})
export class IndirizzoTfPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indirizzoPopupService: IndirizzoTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.indirizzoPopupService
                    .open(IndirizzoTfDialogComponent as Component, params['id']);
            } else {
                this.indirizzoPopupService
                    .open(IndirizzoTfDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
