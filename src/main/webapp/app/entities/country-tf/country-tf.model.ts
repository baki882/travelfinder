import { BaseEntity } from './../../shared';

export class CountryTf implements BaseEntity {
    constructor(
        public id?: number,
        public countryName?: string,
    ) {
    }
}
