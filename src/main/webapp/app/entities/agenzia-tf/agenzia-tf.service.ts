import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AgenziaTf } from './agenzia-tf.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AgenziaTf>;

@Injectable()
export class AgenziaTfService {

    private resourceUrl =  SERVER_API_URL + 'api/agenzias';

    constructor(private http: HttpClient) { }

    create(agenzia: AgenziaTf): Observable<EntityResponseType> {
        const copy = this.convert(agenzia);
        return this.http.post<AgenziaTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(agenzia: AgenziaTf): Observable<EntityResponseType> {
        const copy = this.convert(agenzia);
        return this.http.put<AgenziaTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AgenziaTf>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AgenziaTf[]>> {
        const options = createRequestOption(req);
        return this.http.get<AgenziaTf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AgenziaTf[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AgenziaTf = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AgenziaTf[]>): HttpResponse<AgenziaTf[]> {
        const jsonResponse: AgenziaTf[] = res.body;
        const body: AgenziaTf[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AgenziaTf.
     */
    private convertItemFromServer(agenzia: AgenziaTf): AgenziaTf {
        const copy: AgenziaTf = Object.assign({}, agenzia);
        return copy;
    }

    /**
     * Convert a AgenziaTf to a JSON which can be sent to the server.
     */
    private convert(agenzia: AgenziaTf): AgenziaTf {
        const copy: AgenziaTf = Object.assign({}, agenzia);
        return copy;
    }
}
