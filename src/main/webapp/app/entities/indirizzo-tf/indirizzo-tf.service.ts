import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IndirizzoTf } from './indirizzo-tf.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<IndirizzoTf>;

@Injectable()
export class IndirizzoTfService {

    private resourceUrl =  SERVER_API_URL + 'api/indirizzos';

    constructor(private http: HttpClient) { }

    create(indirizzo: IndirizzoTf): Observable<EntityResponseType> {
        const copy = this.convert(indirizzo);
        return this.http.post<IndirizzoTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(indirizzo: IndirizzoTf): Observable<EntityResponseType> {
        const copy = this.convert(indirizzo);
        return this.http.put<IndirizzoTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IndirizzoTf>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<IndirizzoTf[]>> {
        const options = createRequestOption(req);
        return this.http.get<IndirizzoTf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<IndirizzoTf[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: IndirizzoTf = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<IndirizzoTf[]>): HttpResponse<IndirizzoTf[]> {
        const jsonResponse: IndirizzoTf[] = res.body;
        const body: IndirizzoTf[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to IndirizzoTf.
     */
    private convertItemFromServer(indirizzo: IndirizzoTf): IndirizzoTf {
        const copy: IndirizzoTf = Object.assign({}, indirizzo);
        return copy;
    }

    /**
     * Convert a IndirizzoTf to a JSON which can be sent to the server.
     */
    private convert(indirizzo: IndirizzoTf): IndirizzoTf {
        const copy: IndirizzoTf = Object.assign({}, indirizzo);
        return copy;
    }
}
