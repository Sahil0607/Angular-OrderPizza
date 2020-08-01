import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzaOrderRealDBFirebaseService {

  constructor(private http: HttpClient, private db: AngularFireDatabase, private authService: AuthService) { }

  createPizzaOrder(order: Order){  
    return this.http.post('https://order-pizza-b438c.firebaseio.com/PizzaOrder.json', order);
  }

  updatePizzaOrder(id, order: Order){
    return this.http.patch('https://order-pizza-b438c.firebaseio.com/PizzaOrder/' + id + '.json', order);
  }

  getPizzaOrder(id: string){
    return this.http.get('https://order-pizza-b438c.firebaseio.com/PizzaOrder/' + id + '.json');
  }

  getPizzaOrderList(){
    // We will rec data in {'wsacddvd5415cd': {data}}. So we have to format the data.
    // Pipe and map is from rxjs. It is use for transform the data.
    // pipe is load before the subscribe. So we return data from map then we can subscribe.
    return this.http.get<Order[]>('https://order-pizza-b438c.firebaseio.com/PizzaOrder.json?')
    .pipe(map(responseData => {
      const getOrders: Order[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          getOrders.push({ ...responseData[key], id: key });  // ... use for copy nested data 
        }
      }
      return getOrders; 
    }));
  }

  deletePizzaOrder(id: string){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/PizzaOrder/' + id + '.json');
    
    // return this.db.object('/PizzaOrder/' + id).remove();
  }

  deleteAllPizzaOrder(){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/PizzaOrder.json');
  }
}
