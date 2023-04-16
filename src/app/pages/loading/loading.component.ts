import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@services/loader/loader.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit{
  constructor(private loaderService: LoaderService) { }
  isLoading:Subject<boolean> = this.loaderService.isLoading
  ngOnInit(): void {
    console.log(this.isLoading)
  }
}
