import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CountryTf } from './country-tf.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CountryTf>;

@Injectable()
export class CountryTfService {

    private resourceUrl =  SERVER_API_URL + 'api/countries';

    constructor(private http: HttpClient) { }

    create(country: CountryTf): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.post<CountryTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(country: CountryTf): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http.put<CountryTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CountryTf>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CountryTf[]>> {
        const options = createRequestOption(req);
        return this.http.get<CountryTf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CountryTf[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CountryTf = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CountryTf[]>): HttpResponse<CountryTf[]> {
        const jsonResponse: CountryTf[] = res.body;
        const body: CountryTf[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CountryTf.
     */
    private convertItemFromServer(country: CountryTf): CountryTf {
        const copy: CountryTf = Object.assign({}, country);
        return copy;
    }

    /**
     * Convert a CountryTf to a JSON which can be sent to the server.
     */
    private convert(country: CountryTf): CountryTf {
        const copy: CountryTf = Object.assign({}, country);
        return copy;
    }
}
