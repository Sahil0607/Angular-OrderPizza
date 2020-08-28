import { Injectable } from '@angular/core';
import { Topping } from '../model/topping.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {
  constructor(private http: HttpClient) { }

  toppings() {
    return [
      { name: 'Cheese', itemType: 'Veg', selected: false, price: 1 },
      { name: 'Onion', itemType: 'Veg', selected: false, price: 2 },
      { name: 'Spinach', itemType: 'Veg', selected: false, price: 3 },
      { name: 'Pineple', itemType: 'Veg', selected: false, price: 4 },
      { name: 'Pepperoni', itemType: 'Non-Veg', selected: false, price: 1 },
      { name: 'Tometo', itemType: 'Veg', selected: false, price: 2 },
      { name: 'Meat', itemType: 'Non-Veg', selected: false, price: 3 },
      { name: 'Beef', itemType: 'Non-Veg', selected: false, price: 4 },
      { name: 'Bacon', itemType: 'Non-Veg', selected: false, price: 1 },
      { name: 'Ham', itemType: 'Non-Veg', selected: false, price: 2 },
      { name: 'Sausage', itemType: 'Non-Veg', selected: false, price: 3 },
      { name: 'Chicken', itemType: 'Non-Veg', selected: false, price: 4 },
      { name: 'Broccoli', itemType: 'Veg', selected: false, price: 1 },
      { name: 'Jalapeno', itemType: 'Veg', selected: false, price: 2 },
      { name: 'Mushroom', itemType: 'Veg', selected: false, price: 3 },
      { name: 'Paneer', itemType: 'Veg', selected: false, price: 4 }
    ]
  }

  getToppings() {
    return this.http.get<Topping[]>('https://order-pizza-b438c.firebaseio.com/Toppings.json?')
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

  createToppings() {
    const toppings = this.toppings();
    // this.http.delete('https://order-pizza-b438c.firebaseio.com/Toppings.json');
    toppings.forEach(topping => {
      return this.http.post('https://order-pizza-b438c.firebaseio.com/Toppings.json', topping)
      .subscribe(tpng => console.log(tpng))
    });
  }
}
