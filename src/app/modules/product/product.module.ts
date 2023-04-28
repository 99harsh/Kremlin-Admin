import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { AllProductsComponent } from './all-products/all-products.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ProductComponent,
    AllProductsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProfabricComponentsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ProductModule { }
