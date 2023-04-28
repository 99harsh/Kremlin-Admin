import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@/interfaces/user';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  callBack:Observable<User>

  getAllUsers = (action:string) =>{
    return this.http.get(environment.url+"api/v1/admin/users/"+action)
  }

  updateUserStatus = (payload:object) => {
    return this.http.post(environment.url+"api/v1/admin/user_actions", payload);
  }

  getUserDetails = (payload:string) =>{
    return this.http.get(environment.url+"api/v1/admin/user/"+payload)
  }

  updateUserDetails = (payload:object) =>{
    return this.http.post(environment.url+"api/v1/admin/edit_user_mobile_number", payload)
  }

  userTransactionSummary = (payload:string) => {
    return this.http.get(environment.url+"api/v1/admin/transaction_summary/"+payload);
  } 

  userTransactionDetails = (payload:string) =>{
    return this.http.get(environment.url+"api/v1/admin/transactions/"+payload);
  }



}
