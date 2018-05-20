import { BaseEntity } from './../../shared';

export class JobTf implements BaseEntity {
    constructor(
        public id?: number,
        public jobTitle?: string,
        public minSalary?: number,
        public maxSalary?: number,
    ) {
    }
}
