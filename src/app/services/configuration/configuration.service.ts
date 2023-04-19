import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http:HttpClient) { }

  updateConfiguration = (payload:any, url:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/${url}`, payload)
  }

  getConfiguration = (url:any) =>{
    return this.http.get(`${environment.url}api/v1/${url}`);
  }
}
