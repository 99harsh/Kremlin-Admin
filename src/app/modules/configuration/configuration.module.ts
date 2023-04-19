import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProfabricComponentsModule } from '@profabric/angular-components';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    HomeCarouselComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ProfabricComponentsModule,
    AngularEditorModule,
    ReactiveFormsModule
  ]
})
export class ConfigurationModule { }
