import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionService } from '@services/transaction/transaction.service'; 
import { format } from 'date-fns'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrls: ['./pending-transaction.component.scss']
})
export class PendingTransactionComponent implements OnInit{
  transactionData:any = []
  dtTrigger:Subject<any> = new Subject<any>();
  selectedUser:any = [];
  qrCode:any = "";
  elementType: any = NgxQrcodeElementTypes.URL;
  connectionLevel: any = NgxQrcodeErrorCorrectionLevels.HIGH;
  approveForm:FormGroup;
  constructor(private txnService: TransactionService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private toastr: ToastrService){
                this.approveForm = this.formBuilder.group({
                  transaction_id: new FormControl(null, [Validators.required]),
                  remark: new FormControl(null)
                })
              }
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


  openModal = (content, element) =>{
    this.selectedUser = element;
    if(this.selectedUser.ACCOUNT_NUMBER === null){
      this.qrCode = `upi://pay?pa=${element.MOBILE_NUMBER}@paytm&pn=${element.name}&mc='asd'&tid=${element.REDEEM_TRNX_ID}&tr='abc'&tn=%20890&am=${element.AMOUNT}`
    }
    console.log(this.selectedUser, {size:'lg'})
    this.modalService.open(content, {size: 'lg'});
  }

  paymentAction = (action:any, txn_id:any) =>{
    let st = action == "settled" ? 'Approved' : 'Rejected'
    console.log("LOG",this.approveForm.value)
      if(this.approveForm.valid || action == 'rejected'){
        const payload = {
          status: action,
          transaction_id: this.approveForm.value.transaction_id,
          remarks: this.approveForm.value.remark
        }
        this.txnService.transactionAction(payload, txn_id).subscribe((res:any)=>{
          if(res.status === 200){
            this.initData();
            this.modalService.dismissAll();
            this.toastr.success("Payment "+st+" Successfully!");
          }else{
            this.toastr.error("Something Went Wrong! Backend Error");
          }
        })
      }
  }
}
 