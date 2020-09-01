import { Injectable } from '@angular/core';
import { Checkout } from '../model/checkout.model';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient, private db: AngularFireDatabase,) {}


  createCheckout(checkout: Checkout) {
    return this.http.post('https://order-pizza-b438c.firebaseio.com/Checkouts.json', checkout);
  }

  getCheckout(id: string){
    return this.http.get('https://order-pizza-b438c.firebaseio.com/Checkouts/' + id + '.json');
  }

  getCheckouts(){
    // We will rec data in {'wsacddvd5415cd': {data}}. So we have to format the data.
    // Pipe and map is from rxjs. It is use for transform the data.
    // pipe is load before the subscribe. So we return data from map then we can subscribe.
    return this.http.get<Checkout[]>('https://order-pizza-b438c.firebaseio.com/Checkouts.json?')
    .pipe(map(responseData => {
      const getCheckouts: Checkout[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          getCheckouts.push({ ...responseData[key], id: key });  // ... use for copy nested data 
        }
      }
      return getCheckouts; 
    }));
  }

  deleteCheckout(id: string){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/Checkouts/' + id + '.json');
    
    // return this.db.object('/PizzaOrder/' + id).remove();
  }

  deleteCheckouts(){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/Checkouts.json');
  }
}
