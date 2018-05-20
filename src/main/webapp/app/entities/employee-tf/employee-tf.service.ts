import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmployeeTf } from './employee-tf.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmployeeTf>;

@Injectable()
export class EmployeeTfService {

    private resourceUrl =  SERVER_API_URL + 'api/employees';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(employee: EmployeeTf): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http.post<EmployeeTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(employee: EmployeeTf): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http.put<EmployeeTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmployeeTf>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmployeeTf[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmployeeTf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmployeeTf[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmployeeTf = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmployeeTf[]>): HttpResponse<EmployeeTf[]> {
        const jsonResponse: EmployeeTf[] = res.body;
        const body: EmployeeTf[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmployeeTf.
     */
    private convertItemFromServer(employee: EmployeeTf): EmployeeTf {
        const copy: EmployeeTf = Object.assign({}, employee);
        copy.hireDate = this.dateUtils
            .convertDateTimeFromServer(employee.hireDate);
        return copy;
    }

    /**
     * Convert a EmployeeTf to a JSON which can be sent to the server.
     */
    private convert(employee: EmployeeTf): EmployeeTf {
        const copy: EmployeeTf = Object.assign({}, employee);

        copy.hireDate = this.dateUtils.toDate(employee.hireDate);
        return copy;
    }
}
