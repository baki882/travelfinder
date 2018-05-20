/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TravelfinderTestModule } from '../../../test.module';
import { AgenziaTfDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf-delete-dialog.component';
import { AgenziaTfService } from '../../../../../../main/webapp/app/entities/agenzia-tf/agenzia-tf.service';

describe('Component Tests', () => {

    describe('AgenziaTf Management Delete Component', () => {
        let comp: AgenziaTfDeleteDialogComponent;
        let fixture: ComponentFixture<AgenziaTfDeleteDialogComponent>;
        let service: AgenziaTfService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [AgenziaTfDeleteDialogComponent],
                providers: [
                    AgenziaTfService
                ]
            })
            .overrideTemplate(AgenziaTfDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgenziaTfDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgenziaTfService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
