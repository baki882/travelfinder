import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AgenziaTf } from './agenzia-tf.model';
import { AgenziaTfPopupService } from './agenzia-tf-popup.service';
import { AgenziaTfService } from './agenzia-tf.service';

@Component({
    selector: 'jhi-agenzia-tf-dialog',
    templateUrl: './agenzia-tf-dialog.component.html'
})
export class AgenziaTfDialogComponent implements OnInit {

    agenzia: AgenziaTf;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private agenziaService: AgenziaTfService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.agenzia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agenziaService.update(this.agenzia));
        } else {
            this.subscribeToSaveResponse(
                this.agenziaService.create(this.agenzia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AgenziaTf>>) {
        result.subscribe((res: HttpResponse<AgenziaTf>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AgenziaTf) {
        this.eventManager.broadcast({ name: 'agenziaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-agenzia-tf-popup',
    template: ''
})
export class AgenziaTfPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agenziaPopupService: AgenziaTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agenziaPopupService
                    .open(AgenziaTfDialogComponent as Component, params['id']);
            } else {
                this.agenziaPopupService
                    .open(AgenziaTfDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
