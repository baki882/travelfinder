/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { IndirizzoTfComponent } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf.component';
import { IndirizzoTfService } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf.service';
import { IndirizzoTf } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf.model';

describe('Component Tests', () => {

    describe('IndirizzoTf Management Component', () => {
        let comp: IndirizzoTfComponent;
        let fixture: ComponentFixture<IndirizzoTfComponent>;
        let service: IndirizzoTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [IndirizzoTfComponent],
                providers: [
                    IndirizzoTfService
                ]
            })
            .overrideTemplate(IndirizzoTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndirizzoTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndirizzoTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IndirizzoTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.indirizzos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
