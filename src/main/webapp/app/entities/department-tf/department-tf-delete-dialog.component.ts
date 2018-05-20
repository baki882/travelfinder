import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DepartmentTf } from './department-tf.model';
import { DepartmentTfPopupService } from './department-tf-popup.service';
import { DepartmentTfService } from './department-tf.service';

@Component({
    selector: 'jhi-department-tf-delete-dialog',
    templateUrl: './department-tf-delete-dialog.component.html'
})
export class DepartmentTfDeleteDialogComponent {

    department: DepartmentTf;

    constructor(
        private departmentService: DepartmentTfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.departmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'departmentListModification',
                content: 'Deleted an department'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-department-tf-delete-popup',
    template: ''
})
export class DepartmentTfDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentPopupService: DepartmentTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.departmentPopupService
                .open(DepartmentTfDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
