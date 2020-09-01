import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private db: AngularFireDatabase,) {}

  createOrder(order: Order){  
    return this.http.post('https://order-pizza-b438c.firebaseio.com/Orders.json', order);
  }

  updateOrder(id, order: Order){
    return this.http.patch('https://order-pizza-b438c.firebaseio.com/Orders/' + id + '.json', order);
  }

  getOrder(id: string){
    return this.http.get('https://order-pizza-b438c.firebaseio.com/Orders/' + id + '.json');
  }

  getOrders(){
    // We will rec data in {'wsacddvd5415cd': {data}}. So we have to format the data.
    // Pipe and map is from rxjs. It is use for transform the data.
    // pipe is load before the subscribe. So we return data from map then we can subscribe.
    return this.http.get<Order[]>('https://order-pizza-b438c.firebaseio.com/Orders.json?')
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

  deleteOrder(id: string){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/Orders/' + id + '.json');
    
    // return this.db.object('/PizzaOrder/' + id).remove();
  }

  deleteOrders(){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/Orders.json');
  }
}
