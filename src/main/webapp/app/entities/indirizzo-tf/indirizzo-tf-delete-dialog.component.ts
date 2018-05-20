import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IndirizzoTf } from './indirizzo-tf.model';
import { IndirizzoTfPopupService } from './indirizzo-tf-popup.service';
import { IndirizzoTfService } from './indirizzo-tf.service';

@Component({
    selector: 'jhi-indirizzo-tf-delete-dialog',
    templateUrl: './indirizzo-tf-delete-dialog.component.html'
})
export class IndirizzoTfDeleteDialogComponent {

    indirizzo: IndirizzoTf;

    constructor(
        private indirizzoService: IndirizzoTfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.indirizzoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'indirizzoListModification',
                content: 'Deleted an indirizzo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-indirizzo-tf-delete-popup',
    template: ''
})
export class IndirizzoTfDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private indirizzoPopupService: IndirizzoTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.indirizzoPopupService
                .open(IndirizzoTfDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
