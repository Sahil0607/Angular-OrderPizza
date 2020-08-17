import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PizzaType } from '../model/pizzaType.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaListService {
constructor(private http: HttpClient,) {}

  getPizzaOption() {
    return [
      { name: 'Cheese Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 6, Url:
      './../../assets/sf_cheese_pizza.jpeg' },
      { name: 'Veggie Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 7, Url:
      './../../assets/sf_veggie_pizza.jpeg'},
      { name: 'Pepperoni Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/sf_pepperoni_pizza.jpeg' },
      { name: 'Meat Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/sf_meat_pizza.jpeg' },
      { name: 'Cheese Pizza', city: 'New York', pizzaType: 'Veg', price: 6, Url:
      './../../assets/ny_cheese_pizza.jpeg' },
      { name: 'Veggie Pizza', city: 'New York', pizzaType: 'Veg', price: 7, Url:
      './../../assets/ny_veggie_pizza.jpeg' },
      { name: 'Pepperoni Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/ny_pepperoni_pizza.jpeg' },
      { name: 'Meat Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/ny_meat_pizza.jpeg' },
      { name: 'Cheese Pizza', city: 'Chicago', pizzaType: 'Veg', price: 6, Url:
      './../../assets/chicago_cheese_pizza.jpeg' },
      { name: 'Veggie Pizza', city: 'Chicago', pizzaType: 'Veg', price: 7, Url:
      './../../assets/chicago_veggie_pizza.jpeg' },
      { name: 'Pepperoni Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/chicago_pepperoni_pizza.jpeg' },
      { name: 'Meat Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 8, Url:
      './../../assets/chicago_meat_pizza.jpeg' }
    ]
  }

  getPizzaTypes() {
    return this.http.get<PizzaType[]>('https://order-pizza-b438c.firebaseio.com/PizzaTypes.json?')
    .pipe(map(responseData => {
      const getPizzaTypes: PizzaType[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          getPizzaTypes.push({ ...responseData[key], id: key });  // ... use for copy nested data 
        }
      }
      return getPizzaTypes; 
    }));
  }

  createPizzaTypes() {
    const pizzaTypes = this.getPizzaOption();
    // this.http.delete('https://order-pizza-b438c.firebaseio.com/PizzaTypes.json');
    pizzaTypes.forEach(pizzaType => {
      return this.http.post('https://order-pizza-b438c.firebaseio.com/PizzaTypes.json', pizzaType)
      .subscribe(type => console.log(type))
    });
  }
}
