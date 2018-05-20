import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TaskTf } from './task-tf.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TaskTf>;

@Injectable()
export class TaskTfService {

    private resourceUrl =  SERVER_API_URL + 'api/tasks';

    constructor(private http: HttpClient) { }

    create(task: TaskTf): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http.post<TaskTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(task: TaskTf): Observable<EntityResponseType> {
        const copy = this.convert(task);
        return this.http.put<TaskTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TaskTf>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TaskTf[]>> {
        const options = createRequestOption(req);
        return this.http.get<TaskTf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TaskTf[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TaskTf = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TaskTf[]>): HttpResponse<TaskTf[]> {
        const jsonResponse: TaskTf[] = res.body;
        const body: TaskTf[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TaskTf.
     */
    private convertItemFromServer(task: TaskTf): TaskTf {
        const copy: TaskTf = Object.assign({}, task);
        return copy;
    }

    /**
     * Convert a TaskTf to a JSON which can be sent to the server.
     */
    private convert(task: TaskTf): TaskTf {
        const copy: TaskTf = Object.assign({}, task);
        return copy;
    }
}
