import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionService } from '@services/transaction/transaction.service';
import { format } from 'date-fns'; 
@Component({
  selector: 'app-claimed-transaction',
  templateUrl: './claimed-transaction.component.html',
  styleUrls: ['./claimed-transaction.component.scss']
})
export class ClaimedTransactionComponent  implements OnInit{
  transactionData:any = []
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private txnService: TransactionService){}
  ngOnInit(): void {
    this.initData();
  }

  initData = () => {
    this.dtTrigger = new Subject<any>();
    this.txnService.getAllClaimedTransactions('claimed').subscribe((res:any)=>{
        if(res.status === 200){
            if(res.data.length > 0){
              this.transactionData = res.data;
              
            }
            this.dtTrigger.next(res.data);
          
        }
    })
  }

  formatDate = (date:any) => {
    return format(new Date(date), "dd-MMM hh:mm a");
  }
}
