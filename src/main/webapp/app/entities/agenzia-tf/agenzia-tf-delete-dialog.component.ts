import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AgenziaTf } from './agenzia-tf.model';
import { AgenziaTfPopupService } from './agenzia-tf-popup.service';
import { AgenziaTfService } from './agenzia-tf.service';

@Component({
    selector: 'jhi-agenzia-tf-delete-dialog',
    templateUrl: './agenzia-tf-delete-dialog.component.html'
})
export class AgenziaTfDeleteDialogComponent {

    agenzia: AgenziaTf;

    constructor(
        private agenziaService: AgenziaTfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.agenziaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'agenziaListModification',
                content: 'Deleted an agenzia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-agenzia-tf-delete-popup',
    template: ''
})
export class AgenziaTfDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agenziaPopupService: AgenziaTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.agenziaPopupService
                .open(AgenziaTfDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
