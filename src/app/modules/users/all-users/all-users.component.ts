import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '@services/user-service/user-service.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  constructor(private userService: UserServiceService,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastrService) {
    config.centered = true;
    config.animation = true
    config.backdrop = 'static'

  }


  users: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  selectedData: any = {};
  modalAction: string = "";
  isLoading: boolean = false;
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

  open(content, modalData, action) {
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

  openXl(content, element) {
    this.userService.getUserDetails(element.ID).subscribe((res:any)=>{
        if(res.status == 200){
          this.modalService.open(content, { size: 'xl' });
          console.log(res);
        }
    })
		
	}


}
