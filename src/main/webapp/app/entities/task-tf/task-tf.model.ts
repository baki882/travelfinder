import { BaseEntity } from './../../shared';

export class TaskTf implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
    ) {
    }
}
