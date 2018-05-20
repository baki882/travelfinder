/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TravelfinderTestModule } from '../../../test.module';
import { IndirizzoTfDialogComponent } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf-dialog.component';
import { IndirizzoTfService } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf.service';
import { IndirizzoTf } from '../../../../../../main/webapp/app/entities/indirizzo-tf/indirizzo-tf.model';
import { AgenziaTfService } from '../../../../../../main/webapp/app/entities/agenzia-tf';

describe('Component Tests', () => {

    describe('IndirizzoTf Management Dialog Component', () => {
        let comp: IndirizzoTfDialogComponent;
        let fixture: ComponentFixture<IndirizzoTfDialogComponent>;
        let service: IndirizzoTfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [IndirizzoTfDialogComponent],
                providers: [
                    AgenziaTfService,
                    IndirizzoTfService
                ]
            })
            .overrideTemplate(IndirizzoTfDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IndirizzoTfDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IndirizzoTfService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IndirizzoTf(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.indirizzo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'indirizzoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new IndirizzoTf();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.indirizzo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'indirizzoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});