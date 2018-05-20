/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { AgenziaTfDetailComponent } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf-detail.component';
import { AgenziaTfService } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf.service';
import { AgenziaTf } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf.model';

describe('Component Tests', () => {

    describe('AgenziaTf Management Detail Component', () => {
        let comp: AgenziaTfDetailComponent;
        let fixture: ComponentFixture<AgenziaTfDetailComponent>;
        let service: AgenziaTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [AgenziaTfDetailComponent],
                providers: [
                    AgenziaTfService
                ]
            })
            .overrideTemplate(AgenziaTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgenziaTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgenziaTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AgenziaTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.agenzia).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
