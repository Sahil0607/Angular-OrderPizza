import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { PizzaOrder } from '../pizza-order';

@Injectable({
  providedIn: 'root'
})
export class PizzaOrderFirebaseService {
  pizzaOrderRef: AngularFireList<PizzaOrder> = null;
  private dbPath = '/PizzaOrder';

  constructor(private db: AngularFireDatabase) {
    this.pizzaOrderRef = db.list(this.dbPath);
   }

  createPizzaOrder(order: PizzaOrder){
    return this.pizzaOrderRef.push(order);
  }

  updatePizzaOrder(key: string, value: any){
    return this.pizzaOrderRef.update(key, value);
  }

  getPizzaOrderList(): AngularFireList<PizzaOrder>{
    return this.pizzaOrderRef;
  }

  deletePizzaOrder(key: string): Promise<void>{
    return this.pizzaOrderRef.remove(key);
  }

  deleteAllPizzaOrder(): Promise<void>{
    return this.pizzaOrderRef.remove();
  }
}
