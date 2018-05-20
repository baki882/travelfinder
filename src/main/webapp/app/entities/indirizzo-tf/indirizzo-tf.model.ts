import { BaseEntity } from './../../shared';

export class IndirizzoTf implements BaseEntity {
    constructor(
        public id?: number,
        public indirizzo?: string,
        public citta?: string,
        public provincia?: string,
        public cap?: string,
        public regione?: string,
        public agenziaId?: number,
    ) {
    }
}
