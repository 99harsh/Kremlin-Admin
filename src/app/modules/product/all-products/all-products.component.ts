import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product/product.service';
import { format } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit{

  dtTrigger:Subject<any> = new Subject<any>();
  productData:any = [];
  constructor(private productService: ProductService, private toastr: ToastrService){}
  ngOnInit(): void {
      this.initData();
  }

  initData = () =>{
    this.productService.getAllProducts().subscribe((res:any)=>{
      if(res.status == 200){
        this.productData = res.data;
        this.dtTrigger.next(res.data);
      }else{
        this.toastr.error("Something Went Wrong! Backend Error");
      }
    })
  }

  formatDate = (date:any) =>{
    return format(new Date(date), 'dd-MMM-yyyy hh:mm a');
  }
}
