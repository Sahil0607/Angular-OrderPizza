import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { AppRoutingModule } from './app-routing.module';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PizzaListComponent,
    PizzaOrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
