/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { DepartmentTfComponent } from '../../../../../../main/webapp/app/entities/department-tf/department-tf.component';
import { DepartmentTfService } from '../../../../../../main/webapp/app/entities/department-tf/department-tf.service';
import { DepartmentTf } from '../../../../../../main/webapp/app/entities/department-tf/department-tf.model';

describe('Component Tests', () => {

    describe('DepartmentTf Management Component', () => {
        let comp: DepartmentTfComponent;
        let fixture: ComponentFixture<DepartmentTfComponent>;
        let service: DepartmentTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [DepartmentTfComponent],
                providers: [
                    DepartmentTfService
                ]
            })
            .overrideTemplate(DepartmentTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DepartmentTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.departments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
