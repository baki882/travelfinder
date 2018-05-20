import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DepartmentTf } from './department-tf.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DepartmentTf>;

@Injectable()
export class DepartmentTfService {

    private resourceUrl =  SERVER_API_URL + 'api/departments';

    constructor(private http: HttpClient) { }

    create(department: DepartmentTf): Observable<EntityResponseType> {
        const copy = this.convert(department);
        return this.http.post<DepartmentTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(department: DepartmentTf): Observable<EntityResponseType> {
        const copy = this.convert(department);
        return this.http.put<DepartmentTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DepartmentTf>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DepartmentTf[]>> {
        const options = createRequestOption(req);
        return this.http.get<DepartmentTf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DepartmentTf[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DepartmentTf = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DepartmentTf[]>): HttpResponse<DepartmentTf[]> {
        const jsonResponse: DepartmentTf[] = res.body;
        const body: DepartmentTf[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DepartmentTf.
     */
    private convertItemFromServer(department: DepartmentTf): DepartmentTf {
        const copy: DepartmentTf = Object.assign({}, department);
        return copy;
    }

    /**
     * Convert a DepartmentTf to a JSON which can be sent to the server.
     */
    private convert(department: DepartmentTf): DepartmentTf {
        const copy: DepartmentTf = Object.assign({}, department);
        return copy;
    }
}
