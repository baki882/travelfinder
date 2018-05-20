import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeeTf } from './employee-tf.model';
import { EmployeeTfPopupService } from './employee-tf-popup.service';
import { EmployeeTfService } from './employee-tf.service';

@Component({
    selector: 'jhi-employee-tf-delete-dialog',
    templateUrl: './employee-tf-delete-dialog.component.html'
})
export class EmployeeTfDeleteDialogComponent {

    employee: EmployeeTf;

    constructor(
        private employeeService: EmployeeTfService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'employeeListModification',
                content: 'Deleted an employee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employee-tf-delete-popup',
    template: ''
})
export class EmployeeTfDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeePopupService: EmployeeTfPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.employeePopupService
                .open(EmployeeTfDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
