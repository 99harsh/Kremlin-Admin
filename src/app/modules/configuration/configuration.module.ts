import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { UtilsComponent } from './utils/utils.component';
import { FaqComponent } from './faq/faq.component';
import { DataTablesModule } from 'angular-datatables';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    HomeCarouselComponent,
    UtilsComponent,
    FaqComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ProfabricComponentsModule,
    AngularEditorModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class ConfigurationModule { }
