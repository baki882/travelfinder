/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { AgenziaTfComponent } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf.component';
import { AgenziaTfService } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf.service';
import { AgenziaTf } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf.model';

describe('Component Tests', () => {

    describe('AgenziaTf Management Component', () => {
        let comp: AgenziaTfComponent;
        let fixture: ComponentFixture<AgenziaTfComponent>;
        let service: AgenziaTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [AgenziaTfComponent],
                providers: [
                    AgenziaTfService
                ]
            })
            .overrideTemplate(AgenziaTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgenziaTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgenziaTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AgenziaTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.agenzias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
