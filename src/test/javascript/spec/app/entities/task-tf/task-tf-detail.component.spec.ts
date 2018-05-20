/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TravelfinderTestModule } from '../../../test.module';
import { TaskTfDetailComponent } from '../../../../../../main/webapp/app/entities/task-tf/task-tf-detail.component';
import { TaskTfService } from '../../../../../../main/webapp/app/entities/task-tf/task-tf.service';
import { TaskTf } from '../../../../../../main/webapp/app/entities/task-tf/task-tf.model';

describe('Component Tests', () => {

    describe('TaskTf Management Detail Component', () => {
        let comp: TaskTfDetailComponent;
        let fixture: ComponentFixture<TaskTfDetailComponent>;
        let service: TaskTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [TaskTfDetailComponent],
                providers: [
                    TaskTfService
                ]
            })
            .overrideTemplate(TaskTfDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskTfDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TaskTf(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.task).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
