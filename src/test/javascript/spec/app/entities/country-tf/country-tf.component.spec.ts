/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { CountryTfComponent } from '../../../../../../main/webapp/app/entities/country-tf/country-tf.component';
import { CountryTfService } from '../../../../../../main/webapp/app/entities/country-tf/country-tf.service';
import { CountryTf } from '../../../../../../main/webapp/app/entities/country-tf/country-tf.model';

describe('Component Tests', () => {

    describe('CountryTf Management Component', () => {
        let comp: CountryTfComponent;
        let fixture: ComponentFixture<CountryTfComponent>;
        let service: CountryTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [CountryTfComponent],
                providers: [
                    CountryTfService
                ]
            })
            .overrideTemplate(CountryTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CountryTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.countries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
