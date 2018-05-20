import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TravelfinderAgenziaTfModule } from './agenzia-tf/agenzia-tf.module';
import { TravelfinderCountryTfModule } from './country-tf/country-tf.module';
import { TravelfinderIndirizzoTfModule } from './indirizzo-tf/indirizzo-tf.module';
import { TravelfinderDepartmentTfModule } from './department-tf/department-tf.module';
import { TravelfinderTaskTfModule } from './task-tf/task-tf.module';
import { TravelfinderEmployeeTfModule } from './employee-tf/employee-tf.module';
import { TravelfinderJobTfModule } from './job-tf/job-tf.module';
import { TravelfinderJobHistoryTfModule } from './job-history-tf/job-history-tf.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TravelfinderAgenziaTfModule,
        TravelfinderCountryTfModule,
        TravelfinderIndirizzoTfModule,
        TravelfinderDepartmentTfModule,
        TravelfinderTaskTfModule,
        TravelfinderEmployeeTfModule,
        TravelfinderJobTfModule,
        TravelfinderJobHistoryTfModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelfinderEntityModule {}
