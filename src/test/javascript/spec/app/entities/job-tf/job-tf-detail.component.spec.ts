/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { JobTfDetailComponent } from '../../../../../../main/webapp/app/entities/job-tf/job-tf-detail.component';
import { JobTfService } from '../../../../../../main/webapp/app/entities/job-tf/job-tf.service';
import { JobTf } from '../../../../../../main/webapp/app/entities/job-tf/job-tf.model';

describe('Component Tests', () => {

    describe('JobTf Management Detail Component', () => {
        let comp: JobTfDetailComponent;
        let fixture: ComponentFixture<JobTfDetailComponent>;
        let service: JobTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [JobTfDetailComponent],
                providers: [
                    JobTfService
                ]
            })
            .overrideTemplate(JobTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JobTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JobTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new JobTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.job).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
