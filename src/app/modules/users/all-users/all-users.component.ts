import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '@services/user-service/user-service.service';
import { from, Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { FormGroup, FormControl, Validators, FormBuilder, Form } from '@angular/forms'
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  editForm:FormGroup;
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
  selectedData: any = {};
  modalAction: string = "";
  isLoading: boolean = false;
  userInfo:any = {};

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
      comment: reason
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
        this.modalService.open(content, {size:'xl'})
      }
    })
  }

  formatDOB = (date:any) =>{
    return format(new Date(date), 'dd-MMM-yyyy')
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

}
