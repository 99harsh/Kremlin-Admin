import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = new Subject<boolean>()
  constructor() { }

  show(){
    //console.log("Show")
    this.isLoading.next(true)
  }
  hide(){
   // console.log("Hide")
    this.isLoading.next(false)
  }
}
