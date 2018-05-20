import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountryTf } from './country-tf.model';
import { CountryTfPopupService } from './country-tf-popup.service';
import { CountryTfService } from './country-tf.service';

@Component({
    selector: 'jhi-country-tf-dialog',
    templateUrl: './country-tf-dialog.component.html'
})
export class CountryTfDialogComponent implements OnInit {

    country: CountryTf;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private countryService: CountryTfService,
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
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(
                this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(
                this.countryService.create(this.country));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CountryTf>>) {
        result.subscribe((res: HttpResponse<CountryTf>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CountryTf) {
        this.eventManager.broadcast({ name: 'countryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-country-tf-popup',
    template: ''
})
export class CountryTfPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countryPopupService: CountryTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.countryPopupService
                    .open(CountryTfDialogComponent as Component, params['id']);
            } else {
                this.countryPopupService
                    .open(CountryTfDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
