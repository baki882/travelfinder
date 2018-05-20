/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { EmployeeTfDetailComponent } from '../../../../../../main/webapp/app/entities/employee-tf/employee-tf-detail.component';
import { EmployeeTfService } from '../../../../../../main/webapp/app/entities/employee-tf/employee-tf.service';
import { EmployeeTf } from '../../../../../../main/webapp/app/entities/employee-tf/employee-tf.model';

describe('Component Tests', () => {

    describe('EmployeeTf Management Detail Component', () => {
        let comp: EmployeeTfDetailComponent;
        let fixture: ComponentFixture<EmployeeTfDetailComponent>;
        let service: EmployeeTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [EmployeeTfDetailComponent],
                providers: [
                    EmployeeTfService
                ]
            })
            .overrideTemplate(EmployeeTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmployeeTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.employee).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
