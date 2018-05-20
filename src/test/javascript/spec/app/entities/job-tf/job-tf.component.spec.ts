/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { JobTfComponent } from '../../../../../../main/webapp/app/entities/job-tf/job-tf.component';
import { JobTfService } from '../../../../../../main/webapp/app/entities/job-tf/job-tf.service';
import { JobTf } from '../../../../../../main/webapp/app/entities/job-tf/job-tf.model';

describe('Component Tests', () => {

    describe('JobTf Management Component', () => {
        let comp: JobTfComponent;
        let fixture: ComponentFixture<JobTfComponent>;
        let service: JobTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [JobTfComponent],
                providers: [
                    JobTfService
                ]
            })
            .overrideTemplate(JobTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new JobTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.jobs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
