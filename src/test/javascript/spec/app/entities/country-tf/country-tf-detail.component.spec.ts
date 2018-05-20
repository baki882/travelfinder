/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { CountryTfDetailComponent } from '../../../../../../main/webapp/app/entities/country-tf/country-tf-detail.component';
import { CountryTfService } from '../../../../../../main/webapp/app/entities/country-tf/country-tf.service';
import { CountryTf } from '../../../../../../main/webapp/app/entities/country-tf/country-tf.model';

describe('Component Tests', () => {

    describe('CountryTf Management Detail Component', () => {
        let comp: CountryTfDetailComponent;
        let fixture: ComponentFixture<CountryTfDetailComponent>;
        let service: CountryTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [CountryTfDetailComponent],
                providers: [
                    CountryTfService
                ]
            })
            .overrideTemplate(CountryTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CountryTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.country).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
