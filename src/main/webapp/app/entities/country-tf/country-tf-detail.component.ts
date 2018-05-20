import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CountryTf } from './country-tf.model';
import { CountryTfService } from './country-tf.service';

@Component({
    selector: 'jhi-country-tf-detail',
    templateUrl: './country-tf-detail.component.html'
})
export class CountryTfDetailComponent implements OnInit, OnDestroy {

    country: CountryTf;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private countryService: CountryTfService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCountries();
    }

    load(id) {
        this.countryService.find(id)
            .subscribe((countryResponse: HttpResponse<CountryTf>) => {
                this.country = countryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'countryListModification',
            (response) => this.load(this.country.id)
        );
    }
}
