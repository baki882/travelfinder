/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { DepartmentTfDetailComponent } from '../../../../../../main/webapp/app/entities/department-tf/department-tf-detail.component';
import { DepartmentTfService } from '../../../../../../main/webapp/app/entities/department-tf/department-tf.service';
import { DepartmentTf } from '../../../../../../main/webapp/app/entities/department-tf/department-tf.model';

describe('Component Tests', () => {

    describe('DepartmentTf Management Detail Component', () => {
        let comp: DepartmentTfDetailComponent;
        let fixture: ComponentFixture<DepartmentTfDetailComponent>;
        let service: DepartmentTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [DepartmentTfDetailComponent],
                providers: [
                    DepartmentTfService
                ]
            })
            .overrideTemplate(DepartmentTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DepartmentTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.department).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
