/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { JobHistoryTfComponent } from '../../../../../../main/webapp/app/entities/job-history-tf/job-history-tf.component';
import { JobHistoryTfService } from '../../../../../../main/webapp/app/entities/job-history-tf/job-history-tf.service';
import { JobHistoryTf } from '../../../../../../main/webapp/app/entities/job-history-tf/job-history-tf.model';

describe('Component Tests', () => {

    describe('JobHistoryTf Management Component', () => {
        let comp: JobHistoryTfComponent;
        let fixture: ComponentFixture<JobHistoryTfComponent>;
        let service: JobHistoryTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [JobHistoryTfComponent],
                providers: [
                    JobHistoryTfService
                ]
            })
            .overrideTemplate(JobHistoryTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobHistoryTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobHistoryTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JobHistoryTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
