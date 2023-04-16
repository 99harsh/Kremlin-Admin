import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrCodeRoutingModule } from './qr-code-routing.module';
import { GenerateQrCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { ReactiveFormsModule } from '@angular/forms'
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    GenerateQrCodeComponent
  ],
  imports: [
    CommonModule,
    QrCodeRoutingModule,
    ReactiveFormsModule,
    ProfabricComponentsModule,
    NgxQRCodeModule,
    DataTablesModule,
  ]
})
export class QrCodeModule { }
