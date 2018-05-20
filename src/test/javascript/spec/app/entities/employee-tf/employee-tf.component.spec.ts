/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { EmployeeTfComponent } from '../../../../../../main/webapp/app/entities/employee-tf/employee-tf.component';
import { EmployeeTfService } from '../../../../../../main/webapp/app/entities/employee-tf/employee-tf.service';
import { EmployeeTf } from '../../../../../../main/webapp/app/entities/employee-tf/employee-tf.model';

describe('Component Tests', () => {

    describe('EmployeeTf Management Component', () => {
        let comp: EmployeeTfComponent;
        let fixture: ComponentFixture<EmployeeTfComponent>;
        let service: EmployeeTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [EmployeeTfComponent],
                providers: [
                    EmployeeTfService
                ]
            })
            .overrideTemplate(EmployeeTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmployeeTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
