import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dashboard  } from '@/interfaces/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService{

  constructor(private http: HttpClient) { }

  getStatistics = () =>{
    return this.http.get(environment.url+"api/v1/admin/statistics");
  }

}
 