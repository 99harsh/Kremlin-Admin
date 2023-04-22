import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addNewProduct = (payload:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/product`, payload)
  }

  getAllProducts = () =>{
    return this.http.get(`${environment.url}api/v1/products`)
  }


  getProductDetails = (product_id: any) =>{
    return this.http.get(`${environment.url}api/v1/product/${product_id}`);
  }

  updateProductDescription = (payload:object, item_id:any) =>{
    return this.http.post(`${environment.url}api/v1/admin/edit_product/${item_id}`, payload)
  }

}
