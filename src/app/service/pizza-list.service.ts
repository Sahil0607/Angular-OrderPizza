import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaListService {
  getPizzaOption() {
    return [
      { id: 1, name: 'Cheese Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 6, Url:
      './../../assets/sf_cheese_pizza.jpeg' },
      { id: 2, name: 'Veggie Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 7, Url:
      './../../assets/sf_veggie_pizza.jpeg'},
      { id: 3, name: 'Pepperoni Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/sf_pepperoni_pizza.jpeg' },
      { id: 4, name: 'Meat Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/sf_meat_pizza.jpeg' },
      { id: 5, name: 'Cheese Pizza', city: 'New York', pizzaType: 'Veg', price: 6, Url:
      './../../assets/ny_cheese_pizza.jpeg' },
      { id: 6, name: 'Veggie Pizza', city: 'New York', pizzaType: 'Veg', price: 7, Url:
      './../../assets/ny_veggie_pizza.jpeg' },
      { id: 7, name: 'Pepperoni Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/ny_pepperoni_pizza.jpeg' },
      { id: 8, name: 'Meat Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/ny_meat_pizza.jpeg' },
      { id: 9, name: 'Cheese Pizza', city: 'Chicago', pizzaType: 'Veg', price: 6, Url:
      './../../assets/chicago_cheese_pizza.jpeg' },
      { id: 10, name: 'Veggie Pizza', city: 'Chicago', pizzaType: 'Veg', price: 7, Url:
      './../../assets/chicago_veggie_pizza.jpeg' },
      { id: 11, name: 'Pepperoni Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/chicago_pepperoni_pizza.jpeg' },
      { id: 12, name: 'Meat Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/chicago_meat_pizza.jpeg' }
    ]
  }
}
