import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoute : Routes = [
  {path: 'create', component: PizzaListComponent, canActivate :[AuthGuard]},
  {path: 'create/:id', component: PizzaListComponent, canActivate :[AuthGuard]},
  {path: 'order', component: PizzaOrderComponent, canActivate :[AuthGuard]},
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
