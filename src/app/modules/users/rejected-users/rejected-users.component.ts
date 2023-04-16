import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '@services/user-service/user-service.service';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-rejected-users',
  templateUrl: './rejected-users.component.html',
  styleUrls: ['./rejected-users.component.scss']
})
export class RejectedUsersComponent implements OnInit{
  constructor(private userService: UserServiceService,
    private config: NgbModalConfig,
    private modalService: NgbModal) {
    config.centered = true;
    config.animation = true
    config.backdrop = 'static'

  }


  users: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.userService.getAllUsers('rejected').subscribe((res: any) => {
      if (res.status == 200) {
        this.users = res.data;
        this.dtTrigger.next(this.users);
      }
    })
  }

  open(content) {
    this.modalService.open(content)
  }
}
