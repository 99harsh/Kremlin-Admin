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

     intToString = (num:any) => {
        num = num.toString().replace(/[^0-9.]/g, '');
        if (num < 1000) {
            return num;
        }
        let si = [
          {v: 1E3, s: "K"},
          {v: 1E6, s: "M"},
          {v: 1E9, s: "B"},
          {v: 1E12, s: "T"},
          {v: 1E15, s: "P"},
          {v: 1E18, s: "E"}
          ];
        let index;
        for (index = si.length - 1; index > 0; index--) {
            if (num >= si[index].v) {
                break;
            }
        }
        return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
    };


}
