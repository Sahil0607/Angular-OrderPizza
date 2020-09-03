import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomOrderComponent } from './custom-order/custom-order.component';
import { OrderComponent } from './order/order.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { CheckoutComponent } from './checkout/checkout.component';

const appRoute : Routes = [
  {path: 'menu', component: MenuComponent, canActivate :[AuthGuard]},
  {path: 'menu-item/:item/:location', component: MenuListComponent, canActivate :[AuthGuard]},
  {path: 'custom-order/:item/:location', component: CustomOrderComponent, canActivate :[AuthGuard]},
  {path: 'update-order/:id', component: CustomOrderComponent, canActivate :[AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate :[AuthGuard]},
  {path: 'order', component: OrderComponent, canActivate :[AuthGuard]},
  {path: 'auth', component: AuthComponent },
  {path: '**', redirectTo: '/auth', pathMatch: 'full'},
  // We can also add child route and CanActivateChild in child route
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
