import { Component, OnInit } from '@angular/core';
import { slideIn } from '../animation/animation';
import { Subscription } from 'rxjs';
import { Order } from '../model/order.model';
import { AuthService } from '../auth/auth.service';
import { OrderRealDBFirebaseService } from '../service/order-real-db-firebase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [ slideIn ],
})
export class CheckoutComponent implements OnInit {
  subscription: Subscription;
  orders: Order[] = [];
  isLoading = false;
  error = null;
  isSelectedRemoveOrder: string;
  isSelectedEditOrder: string;

  constructor(private authService: AuthService, private orderRealDBFirebaseService: OrderRealDBFirebaseService,
    private router: Router, private toastr: ToastrService) { }

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
        this.orders = response.filter(res => res.userId === userId && res.completed === false);
        console.log(this.orders);
      }
      this.isLoading = false;
    }, error => {
      this.error = error.message;
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
