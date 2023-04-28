import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'users',
        loadChildren:() => import('./modules/users/users.module').then(m=>m.UsersModule)
    },
    {
        path: 'qr',
        loadChildren:() => import('./modules/qr-code/qr-code.module').then(m=>m.QrCodeModule)
    },
    {
        path: 'transaction',
        loadChildren: ()=> import('./modules/transaction/transaction.module').then(m=>m.TransactionModule)
    },
    {
        path: 'configuration',
        loadChildren: () => import('./modules/configuration/configuration.module').then(m=>m.ConfigurationModule)
    },
    {
        path: 'products',
        loadChildren: () => import('./modules/product/product.module').then(m=>m.ProductModule)
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
