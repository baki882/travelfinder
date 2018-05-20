/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TravelfinderTestModule } from '../../../test.module';
import { TaskTfComponent } from '../../../../../../main/webapp/app/entities/task-tf/task-tf.component';
import { TaskTfService } from '../../../../../../main/webapp/app/entities/task-tf/task-tf.service';
import { TaskTf } from '../../../../../../main/webapp/app/entities/task-tf/task-tf.model';

describe('Component Tests', () => {

    describe('TaskTf Management Component', () => {
        let comp: TaskTfComponent;
        let fixture: ComponentFixture<TaskTfComponent>;
        let service: TaskTfService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TravelfinderTestModule],
                declarations: [TaskTfComponent],
                providers: [
                    TaskTfService
                ]
            })
            .overrideTemplate(TaskTfComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TaskTfComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskTfService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TaskTf(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tasks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
