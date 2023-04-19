import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { MainComponent } from '@modules/main/main.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [{
  path: "",
  component: MainComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children:[
    {
      path:'add-product',
      component:ProductComponent
    },
  {
    path: 'all-products',
    component:AllProductsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
   