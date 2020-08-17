import { Injectable } from '@angular/core';
import { Topping } from '../model/topping.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PizzaTopingsService {
  constructor(private http: HttpClient) { }

  pizzaToppings() {
    return [
      { name: 'Cheese', pizzaType: 'Veg', selected: false, price: 1 },
      { name: 'Onion', pizzaType: 'Veg', selected: false, price: 2 },
      { name: 'Spinach', pizzaType: 'Veg', selected: false, price: 3 },
      { name: 'Pineple', pizzaType: 'Veg', selected: false, price: 4 },
      { name: 'Pepperoni', pizzaType: 'Non-Veg', selected: false, price: 1 },
      { name: 'Tometo', pizzaType: 'Veg', selected: false, price: 2 },
      { name: 'Meat', pizzaType: 'Non-Veg', selected: false, price: 3 },
      { name: 'Beef', pizzaType: 'Non-Veg', selected: false, price: 4 },
      { name: 'Bacon', pizzaType: 'Non-Veg', selected: false, price: 1 },
      { name: 'Ham', pizzaType: 'Non-Veg', selected: false, price: 2 },
      { name: 'Sausage', pizzaType: 'Non-Veg', selected: false, price: 3 },
      { name: 'Chicken', pizzaType: 'Non-Veg', selected: false, price: 4 },
      { name: 'Broccoli', pizzaType: 'Veg', selected: false, price: 1 },
      { name: 'Jalapeno', pizzaType: 'Veg', selected: false, price: 2 },
      { name: 'Mushroom', pizzaType: 'Veg', selected: false, price: 3 },
      { name: 'Paneer', pizzaType: 'Veg', selected: false, price: 4 }
    ]
  }

  getPizzaToppings() {
    return this.http.get<Topping[]>('https://order-pizza-b438c.firebaseio.com/PizzaToppingList.json?')
    .pipe(map(responseData => {
      const getToppings: Topping[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          getToppings.push({ ...responseData[key], id: key });  // ... use for copy nested data 
        }
      }
      return getToppings; 
    }));
  }

  createPizzaToppings() {
    const toppings = this.pizzaToppings();
    // this.http.delete('https://order-pizza-b438c.firebaseio.com/PizzaToppingList.json');
    toppings.forEach(topping => {
      return this.http.post('https://order-pizza-b438c.firebaseio.com/PizzaToppingList.json', topping)
      .subscribe(tpng => console.log(tpng))
    });
  }
}
