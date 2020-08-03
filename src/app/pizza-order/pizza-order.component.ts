import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { PizzaOrderRealDBFirebaseService } from '../service/pizza-order-real-db-firebase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Order } from '../model/order.model';
import { trigger, transition, style, state, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css'],
  animations: [
    trigger('orderInAnimation', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('void => *', [     // Style for entering. void to any
        animate(1000, keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(-67px)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateX(-34px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 1
          }),
        ]))
      ]),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(100px)',
          opacity: 0,
        }))
      ])
    ])
  ],
})

export class PizzaOrderComponent implements OnInit {
  subscription: Subscription;
  orders: Order[] = [];
  isLoading = false;
  error = null;

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
    this.pizzaOrderRealDBFirebaseService.getPizzaOrderList().subscribe(response => {
      if (response) {
        this.orders = response.filter(res => res.userId === userId);
      }
      this.isLoading = false;
    }, error => {
      this.error = error.message;
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




