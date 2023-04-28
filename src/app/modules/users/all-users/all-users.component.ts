import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '@services/user-service/user-service.service';
import { from, Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms'
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  editForm:FormGroup;
  dtElement: any;
  constructor(private userService: UserServiceService,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
     this.editForm = formBuilder.group({
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
    })

    config.centered = true;
    config.animation = true
    config.backdrop = 'static'

  }


  users: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtTragger2: Subject<any> = new Subject();
  selectedData: any = {};
  modalAction: string = "";
  isLoading: boolean = false;
  userInfo:any = {};
  userTransactionSummary:any = [];
  userTransactions:any = [];

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.dtTrigger = new Subject<any>();
    
    this.userService.getAllUsers('all').subscribe((res: any) => {
      if (res.status == 200) {
        this.users = res.data;
        this.dtTrigger.next(this.users);
      }
    })
  }

  open(content, modalData, action, event) {
    event.stopPropagation();
    this.modalAction = action;
    this.selectedData = modalData;
    this.modalService.open(content)
  }


  updateUserStatus = (action: string, reason) => {
    this.isLoading = true;
    const payload = {
      user_id: this.selectedData.ID,
      action: action === 'Approve' ? "APPROVED" : action === "Reject" ? "REJECTED" : "SUSPENDED",
      remarks: reason
    }
    this.userService.updateUserStatus(payload).subscribe((res:any)=>{
      if(res.status === 200){
        this.modalService.dismissAll();
          this.toastr.success(`User ${action}ed Successfully!`);
          this.initData();
      }else{
        this.toastr.warning("Something Went Wrong! BACKEND FAILURE")
      }
      this.isLoading = false;
    })

  }

  openXl(content, element, event) {
    event.stopPropagation();
    this.userService.getUserDetails(element.ID).subscribe((res:any)=>{
        if(res.status == 200){
          this.modalService.open(content, { size: 'xl' });
          console.log("Mobile Number", res.data.MOBILE_NUMBER);
          this.editForm.setValue({
              mobile: res.data.MOBILE_NUMBER
          })
          console.log(this.editForm)
          this.userInfo = res.data;

        }else{
          this.toastr.error("Something Went Wrong! Backend Error.");
        }
    })
	}

  openXLShow(content, element, event){
    event.preventDefault();
    console.log("COntent", content)
    this.userService.getUserDetails(element.ID).subscribe((res:any)=>{
      if(res.status === 200){
        this.userService.userTransactionSummary(element.ID).subscribe((res_transaction:any)=>{
          if(res_transaction.status === 200){
            this.userInfo = res.data;
            this.userTransactionSummary = res_transaction.data[0];
            this.modalService.open(content, {size:'xl'})
          }else{
            this.toastr.error("Something Went Wrong! Backend Error");
          }
        })
       
      }else{
        this.toastr.error("Something Went Wrong! Backend Error");
      }
    })
  }

  formatDOB = (date:any) =>{
    return format(new Date(date), 'dd-MMM-yyyy')
  }

  formatDateTime = (date:any) => {
    return format(new Date(date), 'dd-MMM-yyyy hh:mm a')
  }

  editFormOnSubmit = () => {
      if(this.editForm.valid && this.editForm.value.mobile != this.userInfo.MOBILE_NUMBER){
        const payload = {
          user_id: this.userInfo.ID,
          mobile_number: this.editForm.value.mobile
        }

        this.userService.updateUserDetails(payload).subscribe((res:any)=>{
            if(res.status == 200){
              this.initData();
              this.modalService.dismissAll();
              this.toastr.success("User Updated Successfully!");
            }
            else if(res.status == 409){
              this.toastr.warning("Mobile Number Already Registered!");
            }
            else{
              this.toastr.error("Something Went Wrong! Backend Error");
            }
        })
      }
  }

  userTransactionDetails = (id:any) =>{

      this.dtTragger2  = new Subject<any>();
      this.userService.userTransactionDetails(id).subscribe((res:any)=>{
        if(res.status === 200){
          this.userTransactions = res.data;
          setTimeout(()=>this.dtTragger2.next(res.data));
        }else{
          this.toastr.error("Something Went Wrong! Backend Error");
        }
      })

   
  }

  userDetailsClick = () =>{
   // this.dtTragger2.unsubscribe();
  }
  closeModal = () =>{
    this.modalService.dismissAll();
  }

  ngAfterViewInit(): void {
    this.dtTragger2.next('');
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
     this.dtTragger2.next([]);     
  });
}

intToString = (num:any) => {
  num = num.toString().replace(/[^0-9.]/g, '');
  if (num < 1000) {
      return num;
  }
  let si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
    ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
          break;
      }
  }
  return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
};



}
