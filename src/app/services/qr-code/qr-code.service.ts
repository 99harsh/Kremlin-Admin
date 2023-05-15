import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private http: HttpClient) { }

  generateQRCode = (payload:any) =>{
   return this.http.get(`${environment.url}api/v1/admin/generate_qr_codes?count=${payload.value.count}&value=${payload.value.value}`)
  }

  getAllQRCodes = () =>{
    return this.http.get(`${environment.url}api/v1/admin/qr_codes`)
  }

  getQRCodeByBatchId = (batch_id:string, action:string) => {
    return this.http.get(`${environment.url}api/v1/admin/qr_codes/${batch_id}/${action}`)
  }
}
