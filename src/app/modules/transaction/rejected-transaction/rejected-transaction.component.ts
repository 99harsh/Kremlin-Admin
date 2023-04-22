import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionService } from '@services/transaction/transaction.service'; 
import { format } from 'date-fns'

@Component({
  selector: 'app-rejected-transaction',
  templateUrl: './rejected-transaction.component.html',
  styleUrls: ['./rejected-transaction.component.scss']
})
export class RejectedTransactionComponent implements OnInit{
  transactionData:any = []
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private txnService: TransactionService){}
  ngOnInit(): void {
    this.initData();
  }

  initData = () => {
    this.dtTrigger = new Subject<any>();
    this.txnService.getAllClaimedTransactions('rejected').subscribe((res:any)=>{
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
