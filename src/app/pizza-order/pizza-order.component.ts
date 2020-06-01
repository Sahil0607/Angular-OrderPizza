import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaOrderFirebaseService } from '../service/pizza-order-firebase.service';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  subscription: Subscription;
  messages = [];

  constructor(private messageService: MessageService, private pizzaOrderFirebaseService: PizzaOrderFirebaseService) {
    
   }

  ngOnInit(): void {
    // Observable Used
    // this.messageService.getMessage().subscribe(msg => {
    //   if (msg !== {}) {
    //     this.messages.push(msg.message)
    //   }
    // });

    this.pizzaOrderFirebaseService.getPizzaOrderList().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({key: c.payload.key, ...c.payload.val()})
          )
        )
    ).subscribe(orders => this.messages = orders);
  }

  removeAllOrders() {
    this.pizzaOrderFirebaseService.deleteAllPizzaOrder();
  }

  removeOrder(key: string) {
    console.log(this.messages);
    this.pizzaOrderFirebaseService.deletePizzaOrder(key);
  }

  updateOrder() {

  }

}




