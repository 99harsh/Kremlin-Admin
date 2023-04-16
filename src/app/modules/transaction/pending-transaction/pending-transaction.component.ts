import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionService } from '@services/transaction/transaction.service'; 
import { format } from 'date-fns'
@Component({
  selector: 'app-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrls: ['./pending-transaction.component.scss']
})
export class PendingTransactionComponent implements OnInit{
  transactionData:any = []
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private txnService: TransactionService){}
  ngOnInit(): void {
    this.initData();
  }

  initData = () => {
    this.dtTrigger = new Subject<any>();
    this.txnService.getAllClaimedTransactions('pending').subscribe((res:any)=>{
        if(res.status === 200){
          this.transactionData = res.data;
            this.dtTrigger.next(res.data);
        }
    })
  }

  formatDate(date:any){
      return format(new Date(date), 'dd-MMM hh:mm a');
  }
}
