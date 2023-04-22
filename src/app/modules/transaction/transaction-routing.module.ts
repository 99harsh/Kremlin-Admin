import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { MainComponent } from '@modules/main/main.component';
import { ClaimedTransactionComponent } from './claimed-transaction/claimed-transaction.component';
import { PendingTransactionComponent } from './pending-transaction/pending-transaction.component';
import { RejectedTransactionComponent } from './rejected-transaction/rejected-transaction.component';
import { SettledTransactionComponent } from './settled-transaction/settled-transaction.component';

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children:[
      {
        path: 'claimed',
        component:ClaimedTransactionComponent
      },
      {
        path: 'pending',
        component:PendingTransactionComponent
      },
      {
        path: 'settled',
        component:SettledTransactionComponent
      },
      {
        path: 'rejected',
        component:RejectedTransactionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
