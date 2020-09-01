import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../service/order.service';
import { AuthService } from '../auth/auth.service';
import { CheckoutService } from '../service/checkout.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideIn } from '../animation/animation';
import { Checkout } from '../model/checkout.model';

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

  constructor(private orderService: OrderService, private checkoutService: CheckoutService,
    private router: Router, private toastr: ToastrService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user.subscribe(user => {
      if (user) {
        this.getCheckouts(user.id);
      }
    });
  }

  getCheckouts(userId) {
    this.checkoutService.getCheckouts().subscribe(response => {
      console.log(response);
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

