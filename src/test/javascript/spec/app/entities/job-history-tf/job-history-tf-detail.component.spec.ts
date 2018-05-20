/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { JobHistoryTfDetailComponent } from '../../../../../../main/webapp/app/entities/job-history-tf/job-history-tf-detail.component';
import { JobHistoryTfService } from '../../../../../../main/webapp/app/entities/job-history-tf/job-history-tf.service';
import { JobHistoryTf } from '../../../../../../main/webapp/app/entities/job-history-tf/job-history-tf.model';

describe('Component Tests', () => {

    describe('JobHistoryTf Management Detail Component', () => {
        let comp: JobHistoryTfDetailComponent;
        let fixture: ComponentFixture<JobHistoryTfDetailComponent>;
        let service: JobHistoryTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [JobHistoryTfDetailComponent],
                providers: [
                    JobHistoryTfService
                ]
            })
            .overrideTemplate(JobHistoryTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobHistoryTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobHistoryTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.jobHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
