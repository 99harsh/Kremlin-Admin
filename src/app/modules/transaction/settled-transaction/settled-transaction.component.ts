import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionService } from '@services/transaction/transaction.service'; 
import { format } from 'date-fns'

@Component({
  selector: 'app-settled-transaction',
  templateUrl: './settled-transaction.component.html',
  styleUrls: ['./settled-transaction.component.scss']
})
export class SettledTransactionComponent implements OnInit{
  transactionData:any = []
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private txnService: TransactionService){}
  ngOnInit(): void {
    this.initData();
  }

  initData = () => {
    this.dtTrigger = new Subject<any>();
    this.txnService.getAllClaimedTransactions('settled').subscribe((res:any)=>{
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
