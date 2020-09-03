import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../service/order.service';
import { AuthService } from '../auth/auth.service';
import { CheckoutService } from '../service/checkout.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideIn } from '../animation/animation';
import { Checkout } from '../model/checkout.model';
import { ToppingService } from '../service/topping.service';
import { Topping } from '../model/topping.model';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [ slideIn ],
})

export class OrderComponent implements OnInit {
  subscription: Subscription;
  checkouts: Checkout[] = [];
  isLoading = false;
  error = null;
  isSelectedRemoveOrder: string;
  toppings: Topping[] = [];

  constructor(private orderService: OrderService, private checkoutService: CheckoutService,
    private router: Router, private toastr: ToastrService, private authService: AuthService,
    private toppingService: ToppingService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user.subscribe(user => {
      if (user) {
        this.getCheckouts(user.id);
      }
    });
    this.toppingService.getToppings().subscribe(response => {
      this.toppings = response;
    });
  }

  getCheckouts(userId) {
    this.checkoutService.getCheckouts().subscribe(response => {
      if (response) {
        this.checkouts = response.filter(res => res.userId === userId);
      }
      this.isLoading = false;
    }, error => {
      this.error = error.message;
    });
  }

  removeAllOrders() {
    this.checkoutService.deleteCheckouts().subscribe(() => {
      this.checkouts = [];
    });
  }

  removeSelectedOrder(key: string) {
    this.isSelectedRemoveOrder = key;
  }

  async removeOrder() {
    await this.checkoutService.deleteCheckout(this.isSelectedRemoveOrder).subscribe(() => {
      let removeIndex = this.checkouts.map(item => item.id).indexOf(this.isSelectedRemoveOrder);
      this.checkouts.splice(removeIndex, 1);
      this.toastr.error('Deleted Successfully', 'Order Reg.');
      // this.toastr.warning('Deleted Successfully', 'Order Reg.');
    });
  }

  getOrderVegTopping(order: Order) {
    if (order.vegToppings && order.vegToppings.length) {
      let newToppings = [];
      order.vegToppings.forEach(vegTpng => {
        if (this.toppings.filter(tpng => tpng.id === vegTpng)[0]) {
          newToppings.push(this.toppings.filter(tpng => tpng.id === vegTpng)[0]);
        }
      });
      return newToppings;
    }
  }

  getOrderNonVegTopping(order: Order) {
    if (order.nonVegToppings && order.nonVegToppings.length) {
      let newToppings = [];
      order.nonVegToppings.forEach(nonVegTpng => {
        if (this.toppings.filter(tpng => tpng.id === nonVegTpng)[0]) {
          newToppings.push(this.toppings.filter(tpng => tpng.id === nonVegTpng)[0]);
        }
      });
      return newToppings;
    }
  }
}




// ngOnInit(): void {
//   Firebase Cloud database
//   this.OrderRealDBFirebaseService.getOrderList().subscribe(actionArrays => {
//     this.messages = actionArrays.map(item => {
//       return {
//         id: item.payload.doc.id,
//         ...(item.payload.doc.data() as Order),
//       } as Order
//     }) 
//   });

  
//   Observable Used
//   this.messageService.getMessage().subscribe(msg => {
//     if (msg !== {}) {
//       this.orders.push(msg.message)
//     }
//   });
// }

  // async removeOrder(key: string) {
  //   if(confirm('Are you sure you want to delete order?')) {
  //     await this.orderRealDBFirebaseService.deleteOrder(key).subscribe(() => {
  //       let removeIndex = this.orders.map(item => item.id).indexOf(key);
  //       this.orders.splice(removeIndex, 1);
  //       this.toastr.error('Deleted Successfully', 'Order Reg.');
  //       // this.toastr.warning('Deleted Successfully', 'Order Reg.');
  //     });
  //   }
  // }

  // editOrder(id) {
  //   if(confirm('Are you sure you want to edit order?')) {
  //     this.router.navigate(['/update-order', id]);
  //   }
  // }

