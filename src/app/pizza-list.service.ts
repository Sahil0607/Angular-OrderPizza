import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaListService {
  getPizzaOption() {
    return [
      { id: 1, name: 'SF Cheese Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 10, Url:
      './../../assets/sf_cheese_pizza.jpeg' },
      { id: 2, name: 'SF Veggie Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 11, Url:
      './../../assets/sf_veggie_pizza.jpeg'},
      { id: 3, name: 'SF Peproni Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 12, Url:
      './../../assets/sf_pepperoni_pizza.jpeg' },
      { id: 4, name: 'SF Meat Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 13, Url:
      './../../assets/sf_meat_pizza.jpeg' },
      { id: 5, name: 'NY Cheese Pizza', city: 'New York', pizzaType: 'Veg', price: 10, Url:
      './../../assets/ny_cheese_pizza.jpeg' },
      { id: 6, name: 'NY Veggie Pizza', city: 'New York', pizzaType: 'Veg', price: 11, Url:
      './../../assets/ny_veggie_pizza.jpeg' },
      { id: 7, name: 'NY Peproni Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 12, Url:
      './../../assets/ny_pepperoni_pizza.jpeg' },
      { id: 8, name: 'NY Meat Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 13, Url:
      './../../assets/ny_meat_pizza.jpeg' },
      { id: 9, name: 'CG Cheese Pizzaa', city: 'Chicago', pizzaType: 'Veg', price: 10, Url:
      './../../assets/chicago_cheese_pizza.jpeg' },
      { id: 10, name: 'CG Veggie Pizza', city: 'Chicago', pizzaType: 'Veg', price: 11, Url:
      './../../assets/chicago_veggie_pizza.jpeg' },
      { id: 11, name: 'CG Peproni Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 12, Url:
      './../../assets/chicago_pepperoni_pizza.jpeg' },
      { id: 12, name: 'CG Meat Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 13, Url:
      './../../assets/chicago_meat_pizza.jpeg' }
    ]
  }
}
