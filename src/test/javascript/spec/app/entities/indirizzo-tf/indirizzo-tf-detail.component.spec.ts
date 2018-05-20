/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { IndirizzoTfDetailComponent } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf-detail.component';
import { IndirizzoTfService } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf.service';
import { IndirizzoTf } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf.model';

describe('Component Tests', () => {

    describe('IndirizzoTf Management Detail Component', () => {
        let comp: IndirizzoTfDetailComponent;
        let fixture: ComponentFixture<IndirizzoTfDetailComponent>;
        let service: IndirizzoTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [IndirizzoTfDetailComponent],
                providers: [
                    IndirizzoTfService
                ]
            })
            .overrideTemplate(IndirizzoTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndirizzoTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndirizzoTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IndirizzoTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.indirizzo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
