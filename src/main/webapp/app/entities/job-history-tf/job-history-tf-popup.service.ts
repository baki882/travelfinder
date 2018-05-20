import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JobHistoryTf } from './job-history-tf.model';
import { JobHistoryTfService } from './job-history-tf.service';

@Injectable()
export class JobHistoryTfPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private jobHistoryService: JobHistoryTfService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jobHistoryService.find(id)
                    .subscribe((jobHistoryResponse: HttpResponse<JobHistoryTf>) => {
                        const jobHistory: JobHistoryTf = jobHistoryResponse.body;
                        jobHistory.startDate = this.datePipe
                            .transform(jobHistory.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        jobHistory.endDate = this.datePipe
                            .transform(jobHistory.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.jobHistoryModalRef(component, jobHistory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobHistoryModalRef(component, new JobHistoryTf());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobHistoryModalRef(component: Component, jobHistory: JobHistoryTf): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jobHistory = jobHistory;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
