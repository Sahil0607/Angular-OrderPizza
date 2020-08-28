import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Order } from '../../model/order.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderCloudFirebaseService {
  OrderRef: AngularFireList<Order> = null;
  private dbPath = '/PizzaOrder';

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {
    this.OrderRef = db.list(this.dbPath);
   }

  createOrder(order: Order){
    return this.firestore.collection('PizzaOrders').add(order);
  }

  updateOrder(key: string, value: any){
    return this.OrderRef.update(key, value);
  }

  getOrder(id){
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

  getOrderList(){
    return this.firestore.collection('PizzaOrders').snapshotChanges();  // return observable
  }

  deleteOrder(id: string): Promise<void>{
    return this.firestore.doc('PizzaOrders/' + id).delete();
  }

  deleteAllOrder(): Promise<void>{
    return this.OrderRef.remove();
  }
}
