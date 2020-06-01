import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';

const appRoute : Routes = [
  {path: 'create', component: PizzaListComponent},
  {path: 'order', component: PizzaOrderComponent},
  {path: '**', redirectTo: '/create', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
