import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { PizzaOrder } from '../pizza-order';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PizzaOrderFirebaseService {
  pizzaOrderRef: AngularFireList<PizzaOrder> = null;
  private dbPath = '/PizzaOrder';

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {
    this.pizzaOrderRef = db.list(this.dbPath);
   }

  createPizzaOrder(order: PizzaOrder){
    // Database Method
    // return this.pizzaOrderRef.push(order);

    // Cloud Database Method
    return this.firestore.collection('PizzaOrders').add(order);
  }

  updatePizzaOrder(key: string, value: any){
    return this.pizzaOrderRef.update(key, value);
  }

  getPizzaOrder(id){
    // return this.pizzaOrderRef = this.db.list(this.dbPath, ref => ref.orderByChild('key').equalTo(key));
  
    // console.log(this.firestore.collection('PizzaOrders/'+ id).snapshotChanges());
    return this.firestore.collection('PizzaOrders').doc(id).ref.get().then(function(doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });;
  }

  getPizzaOrderList(){
    // return this.pizzaOrderRef;
    return this.firestore.collection('PizzaOrders').snapshotChanges();  // return observable
  }

  deletePizzaOrder(id: string): Promise<void>{
    // return this.pizzaOrderRef.remove(key);
   
    return this.firestore.doc('PizzaOrders/' + id).delete();
  }

  deleteAllPizzaOrder(): Promise<void>{
    return this.pizzaOrderRef.remove();
  }
}
