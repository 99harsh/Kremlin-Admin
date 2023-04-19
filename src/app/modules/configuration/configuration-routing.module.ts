import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { MainComponent } from '@modules/main/main.component';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [{
  path: "",
  component: MainComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children:[
    {
      path: 'privacy-policy',
      component:PrivacyPolicyComponent
    },
    {
      path: 'terms-and-conditions',
      component:TermsAndConditionsComponent
    },
    {
      path:'home-carousel',
      component:HomeCarouselComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
