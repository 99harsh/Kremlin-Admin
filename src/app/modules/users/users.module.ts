import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { DataTablesModule } from 'angular-datatables';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { SuspendedUsersComponent } from './suspended-users/suspended-users.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { RejectedUsersComponent } from './rejected-users/rejected-users.component'
import { PfButton, ProfabricComponentsModule } from '@profabric/angular-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllUsersComponent,
    PendingUsersComponent,
    SuspendedUsersComponent,
    ActiveUsersComponent,
    RejectedUsersComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
     DataTablesModule,
     NgbModule,
     ProfabricComponentsModule,
     ReactiveFormsModule
  ]
})
export class UsersModule { }
