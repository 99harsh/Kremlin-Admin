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

  getUtils = (key:string) =>{
    return this.http.get(`${environment.url}api/v1/admin/utils_variables?key=${key}`)
  }

  updateUtils = (payload:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/utils_variables?key=${payload.key}&value=${payload.value}`, {})
  }

  getHomeCarosuel = () =>{
    return this.http.get(`${environment.url}api/v1/admin/carousels`);
  }
  addImageCarosuel = (payload:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/carousel`, payload)
  }

  deleteCarosuel = (payload:any) =>{
    return this.http.delete(`${environment.url}api/v1/admin/carousel/${payload}`)
  }

  getFAQ = () =>{
    return this.http.get(`${environment.url}api/v1/faqs`);
  }

  addFaq = (payload:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/faq`, payload)
  }

  deleteFAQ = (payload:any) =>{
    return this.http.delete(`${environment.url}api/v1/admin/faq/${payload}`)
  }

  editFAQ = (payload:any, id:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/faq/${id}`, payload)
  }

}
