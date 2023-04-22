import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAllClaimedTransactions = (option:string) => {
    return this.http.get(`${environment.url}api/v1/admin/all_transactions/${option}`)
  }

  transactionAction = (payload:any, txn_id:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/redeem_transaction_actions/${txn_id}`, payload)
  }
}
