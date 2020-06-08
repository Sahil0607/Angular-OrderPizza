import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaOrderRealDBFirebaseService } from '../service/pizza-order-real-db-firebase.service';
import { Router } from '@angular/router';
import { PizzaOrder } from '../pizza-order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  subscription: Subscription;
  messages = [];
  isLoading = false;

  constructor(private messageService: MessageService, private pizzaOrderRealDBFirebaseService: PizzaOrderRealDBFirebaseService,
    private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getPizzaOrders();
  }

  getPizzaOrders() {
    // Firebase database
    this.pizzaOrderRealDBFirebaseService.getPizzaOrderList().subscribe(orders => {
      if (orders) {
        let orderKeys = Object.keys(orders);
        let orderValue = Object.values(orders);
        let finalOrder = [];

        orderValue.forEach((order, index) => {
          let val = {
            id: orderKeys[index],
            ...order
          }
          finalOrder.push(val);
        });
        this.messages = finalOrder;
        this.isLoading = false;
      }
      else {
        this.messages = [];
        this.isLoading = false;
      }
    });
  }

  removeAllOrders() {
    this.pizzaOrderRealDBFirebaseService.deleteAllPizzaOrder().subscribe(() => {
      this.messages = [];
    });
  }

  removeOrder(key: string) {
    this.pizzaOrderRealDBFirebaseService.deletePizzaOrder(key)  // .subscribe(data => console.log(data));
    this.getPizzaOrders();
    this.toastr.warning('Deleted Successfully', 'Pizza Reg.');
  }

  editOrder(id: string) {
    console.log(this.messages);
    console.log(id);
    this.router.navigate(['/create', id]);
  }

}




// ngOnInit(): void {
//   Firebase Cloud database
//   this.pizzaOrderRealDBFirebaseService.getPizzaOrderList().subscribe(actionArrays => {
//     this.messages = actionArrays.map(item => {
//       return {
//         id: item.payload.doc.id,
//         ...(item.payload.doc.data() as PizzaOrder),
//       } as PizzaOrder
//     }) 
//   });

  
//   Observable Used
//   this.messageService.getMessage().subscribe(msg => {
//     if (msg !== {}) {
//       this.messages.push(msg.message)
//     }
//   });
// }




