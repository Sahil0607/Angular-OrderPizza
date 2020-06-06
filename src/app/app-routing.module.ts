import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { AuthComponent } from './auth/auth.component';

const appRoute : Routes = [
  {path: 'create', component: PizzaListComponent},
  {path: 'order', component: PizzaOrderComponent},
  {path: 'create/:id', component: PizzaListComponent }, 
  {path: 'auth', component: AuthComponent },
  {path: '**', redirectTo: '/auth', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
