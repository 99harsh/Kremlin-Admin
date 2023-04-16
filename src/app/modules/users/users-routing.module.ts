import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { MainComponent } from '@modules/main/main.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { RejectedUsersComponent } from './rejected-users/rejected-users.component';
import { SuspendedUsersComponent } from './suspended-users/suspended-users.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [{
      path: 'all',
      component: AllUsersComponent
    },
    {
      path: 'pending',
      component: PendingUsersComponent
    },
    {
      path: 'suspended',
      component: SuspendedUsersComponent
    },
    {
      path: 'active',
      component:ActiveUsersComponent
    },
    {
      path:'rejected',
      component:RejectedUsersComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
