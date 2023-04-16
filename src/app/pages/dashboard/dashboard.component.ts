import {Component, OnInit} from '@angular/core';
import { DashboardService } from '@services/dashboard/dashboard.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

    constructor(private dashboardSerivce: DashboardService){}

    statisticData:any = [];

    ngOnInit(): void {
        this.initData()
    }

    initData = () =>{
        this.dashboardSerivce.getStatistics().subscribe((res:any)=>{
            if(res.status === 200){
                this.statisticData = res.data;
            }
        })
    }


}
