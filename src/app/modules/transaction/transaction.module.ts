import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { ClaimedTransactionComponent } from './claimed-transaction/claimed-transaction.component';
import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';
import { SettledTransactionComponent } from './settled-transaction/settled-transaction.component';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ClaimedTransactionComponent,
    PendingTransactionComponent,
    SettledTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ProfabricComponentsModule,
    DataTablesModule
  ]
})
export class TransactionModule { }
