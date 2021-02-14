import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderRealDBFirebaseService } from '../service/order-real-db-firebase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { Order } from '../model/order.model';
import { slideIn } from '../animation/animation';

@Component({
  selector: 'app-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.css'],
  animations: [ slideIn ],
})

export class ItemOrderComponent implements OnInit {
  subscription: Subscription;
  orders: Order[] = [];
  isLoading = false;
  error = null;

  constructor(private orderRealDBFirebaseService: OrderRealDBFirebaseService,
    private router: Router, private toastr: ToastrService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user.subscribe(user => {
      if (user) {
        this.getItemOrders(user.id);
      }
    });
  }

  getItemOrders(userId) {
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

  async removeOrder(key: string) {
    if(confirm('Are you sure you want to delete order?')) {
      await this.orderRealDBFirebaseService.deleteOrder(key).subscribe(() => {
        let removeIndex = this.orders.map(item => item.id).indexOf(key);
        this.orders.splice(removeIndex, 1);
        this.toastr.error('Deleted Successfully', 'Item Reg.');
        // this.toastr.warning('Deleted Successfully', 'Item Reg.');
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




