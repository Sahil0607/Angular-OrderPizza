import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaOrderRealDBFirebaseService } from '../service/pizza-order-real-db-firebase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  subscription: Subscription;
  orders: Order[] = [];
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
    // We will rec data in {'wsacddvd5415cd': {data}}. So we have to format the data.
    // Pipe and map is from rxjs. It is use for transform the data.
    // pipe is load before the subscribe. So we return data from map then we can subscribe.
    this.pizzaOrderRealDBFirebaseService.getPizzaOrderList() 
    .pipe(map(responseData => {
      const getOrders: Order[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          getOrders.push({ ...responseData[key], id: key });  // ... use for copy nested data 
        }
      }
      return getOrders; 
    }))
    .subscribe(response => {
      if (response) {
        this.orders = response;
      }
      this.isLoading = false;
    });
  }

  removeAllOrders() {
    this.pizzaOrderRealDBFirebaseService.deleteAllPizzaOrder().subscribe(() => {
      this.orders = [];
    });
  }

  async removeOrder(key: string) {
    if(confirm('Are you sure you want to delete order?')) {
      await this.pizzaOrderRealDBFirebaseService.deletePizzaOrder(key).subscribe(() => {
        let removeIndex = this.orders.map(item => item.id).indexOf(key);
        this.orders.splice(removeIndex, 1);
        this.toastr.warning('Deleted Successfully', 'Pizza Reg.');
      });
    }
  }

  editOrder(id) {
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
//       this.orders.push(msg.message)
//     }
//   });
// }




