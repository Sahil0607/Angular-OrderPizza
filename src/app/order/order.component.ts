import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderRealDBFirebaseService } from '../service/order-real-db-firebase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Order } from '../model/order.model';
import { slideIn } from '../animation/animation';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [ slideIn ],
})

export class OrderComponent implements OnInit {
  subscription: Subscription;
  orders: Order[] = [];
  isLoading = false;
  error = null;
  isSelectedRemoveOrder: string;
  isSelectedEditOrder: string;

  constructor(private orderRealDBFirebaseService: OrderRealDBFirebaseService,
    private router: Router, private toastr: ToastrService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user.subscribe(user => {
      if (user) {
        this.getOrders(user.id);
      }
    });
  }

  getOrders(userId) {
    this.orderRealDBFirebaseService.getOrderList().subscribe(response => {
      if (response) {
        this.orders = response.filter(res => res.userId === userId);
      }
      this.isLoading = false;
    }, error => {
      this.error = error.message;
    });
  }

  removeAllOrders() {
    this.orderRealDBFirebaseService.deleteOrders().subscribe(() => {
      this.orders = [];
    });
  }

  removeSelectedOrder(key: string) {
    this.isSelectedRemoveOrder = key;
  }

  async removeOrder() {
    await this.orderRealDBFirebaseService.deleteOrder(this.isSelectedRemoveOrder).subscribe(() => {
      let removeIndex = this.orders.map(item => item.id).indexOf(this.isSelectedRemoveOrder);
      this.orders.splice(removeIndex, 1);
      this.toastr.error('Deleted Successfully', 'Order Reg.');
      // this.toastr.warning('Deleted Successfully', 'Order Reg.');
    });
  }

  editSelectedOrder(key: string) {
    this.isSelectedEditOrder = key;
  }

  editOrder() {
    this.router.navigate(['/update-order', this.isSelectedEditOrder]);
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

