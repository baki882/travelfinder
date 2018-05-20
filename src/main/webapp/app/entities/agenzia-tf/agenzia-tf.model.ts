import { BaseEntity } from './../../shared';

export class AgenziaTf implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public sedes?: BaseEntity[],
    ) {
    }
}
