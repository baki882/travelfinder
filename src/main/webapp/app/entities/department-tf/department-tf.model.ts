import { BaseEntity } from './../../shared';

export class DepartmentTf implements BaseEntity {
    constructor(
        public id?: number,
        public departmentName?: string,
    ) {
    }
}
