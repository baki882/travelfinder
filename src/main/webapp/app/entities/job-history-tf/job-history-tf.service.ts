import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { JobHistoryTf } from './job-history-tf.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<JobHistoryTf>;

@Injectable()
export class JobHistoryTfService {

    private resourceUrl =  SERVER_API_URL + 'api/job-histories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(jobHistory: JobHistoryTf): Observable<EntityResponseType> {
        const copy = this.convert(jobHistory);
        return this.http.post<JobHistoryTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jobHistory: JobHistoryTf): Observable<EntityResponseType> {
        const copy = this.convert(jobHistory);
        return this.http.put<JobHistoryTf>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<JobHistoryTf>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<JobHistoryTf[]>> {
        const options = createRequestOption(req);
        return this.http.get<JobHistoryTf[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<JobHistoryTf[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: JobHistoryTf = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<JobHistoryTf[]>): HttpResponse<JobHistoryTf[]> {
        const jsonResponse: JobHistoryTf[] = res.body;
        const body: JobHistoryTf[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to JobHistoryTf.
     */
    private convertItemFromServer(jobHistory: JobHistoryTf): JobHistoryTf {
        const copy: JobHistoryTf = Object.assign({}, jobHistory);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(jobHistory.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(jobHistory.endDate);
        return copy;
    }

    /**
     * Convert a JobHistoryTf to a JSON which can be sent to the server.
     */
    private convert(jobHistory: JobHistoryTf): JobHistoryTf {
        const copy: JobHistoryTf = Object.assign({}, jobHistory);

        copy.startDate = this.dateUtils.toDate(jobHistory.startDate);

        copy.endDate = this.dateUtils.toDate(jobHistory.endDate);
        return copy;
    }
}
