import { Injectable } from '@angular/core';
import { PizzaOrder } from '../pizza-order';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaOrderRealDBFirebaseService {

  constructor(private http: HttpClient, private db: AngularFireDatabase, private authService: AuthService) { }

  createPizzaOrder(order: PizzaOrder){  
    return this.http.post('https://order-pizza-b438c.firebaseio.com/PizzaOrder.json', order);
  }

  updatePizzaOrder(id, order: PizzaOrder){
    return this.http.patch('https://order-pizza-b438c.firebaseio.com/PizzaOrder/' + id + '.json', order);
  }

  getPizzaOrder(id: string){
    return this.http.get('https://order-pizza-b438c.firebaseio.com/PizzaOrder/' + id + '.json');
  }

  getPizzaOrderList(){
    return this.http.get<PizzaOrder[]>('https://order-pizza-b438c.firebaseio.com/PizzaOrder.json?');
  }

  deletePizzaOrder(id: string){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/PizzaOrder/' + id + '.json');
    
    // return this.db.object('/PizzaOrder/' + id).remove();
  }

  deleteAllPizzaOrder(){
    return this.http.delete('https://order-pizza-b438c.firebaseio.com/PizzaOrder.json');
  }
}
