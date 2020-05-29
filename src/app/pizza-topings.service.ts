import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaTopingsService {
  constructor() { }

  getPizzaToppings() {
    return [
      { id: 1, name: 'Cheese', pizzaType: 'Veg', selected: false, price: 1 },
      { id: 2, name: 'Onion', pizzaType: 'Veg', selected: false, price: 2 },
      { id: 3, name: 'Spinach', pizzaType: 'Veg', selected: false, price: 3 },
      { id: 4, name: 'Pineple', pizzaType: 'Veg', selected: false, price: 4 },
      { id: 5, name: 'Pepperoni', pizzaType: 'Non-Veg', selected: false, price: 1 },
      { id: 6, name: 'Tometo', pizzaType: 'Veg', selected: false, price: 2 },
      { id: 7, name: 'Meat', pizzaType: 'Non-Veg', selected: false, price: 3 },
      { id: 8, name: 'Beef', pizzaType: 'Non-Veg', selected: false, price: 4 },
      { id: 9, name: 'Bacon', pizzaType: 'Non-Veg', selected: false, price: 1 },
      { id: 10, name: 'Ham', pizzaType: 'Non-Veg', selected: false, price: 2 },
      { id: 11, name: 'Sausage', pizzaType: 'Non-Veg', selected: false, price: 3 },
      { id: 12, name: 'Chicken', pizzaType: 'Non-Veg', selected: false, price: 4 },
      { id: 13, name: 'Broccoli', pizzaType: 'Veg', selected: false, price: 1 },
      { id: 14, name: 'Jalapeno', pizzaType: 'Non-Veg', selected: false, price: 2 },
      { id: 15, name: 'Mushroom', pizzaType: 'Veg', selected: false, price: 3 },
      { id: 16, name: 'Cheese', pizzaType: 'Non-Veg', selected: false, price: 4 }
    ]
  }
}
