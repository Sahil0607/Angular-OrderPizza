import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaOrderRealDBFirebaseService } from '../service/pizza-order-real-db-firebase.service';
import { Router } from '@angular/router';
import { PizzaOrder } from '../pizza-order';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

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
    private router: Router, private toastr: ToastrService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user.subscribe(user => {
      if (user) {
        this.getPizzaOrders(user.id);
      }
    });
    
  }

  getPizzaOrders(userId) {
    // Firebase database
    this.pizzaOrderRealDBFirebaseService.getPizzaOrderList().subscribe(orders => {
      if (orders) {
        let orderKeys = Object.keys(orders);
        let orderValue = Object.values(orders);
        let finalOrder = [];

        orderValue.forEach((order, index) => {
          if (order.userId === userId) {
            let val = {
              id: orderKeys[index],
              ...order
            }
            finalOrder.push(val);
          }
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

  async removeOrder(key: string) {
    if(confirm('Are you sure you want to delete order?')) {
      await this.pizzaOrderRealDBFirebaseService.deletePizzaOrder(key).subscribe(() => {
        let removeIndex = this.messages.map(item => item.id).indexOf(key);
        this.messages.splice(removeIndex, 1);
        this.toastr.warning('Deleted Successfully', 'Pizza Reg.');
      });
    }
  }

  editOrder(id) {
    console.log(this.messages);
    console.log(id);
    if(confirm('Are you sure you want to edit order?')) {
      this.router.navigate(['/create', id]);
    }
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




