import { Component, OnInit } from '@angular/core';
import { slideIn } from '../animation/animation';
import { Subscription } from 'rxjs';
import { Order } from '../model/order.model';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../service/order.service';
import { CheckoutService } from '../service/checkout.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Checkout } from '../model/checkout.model';
import { User } from '../model/user.model';

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
  subtotal: number = 0;
  priceWithTax: number = 0;
  tax: number = 0;
  user: User;

  constructor(private authService: AuthService, private orderService: OrderService,
    private router: Router, private toastr: ToastrService, private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.user.subscribe(resUser => {
      this.user = resUser;
      if (resUser) {
        this.getOrders(resUser.id);
      }
    });
  }

  getOrders(userId) {
    this.orderService.getOrders().subscribe(response => {
      if (response) {
        this.orders = response.filter(res => res.userId === userId && res.completed === false);
      }
      this.isLoading = false;
      this.calculateTotalAndTax();
    }, error => {
      this.error = error.message;
    });
  }

  removeSelectedOrder(key: string) {
    this.isSelectedRemoveOrder = key;
  }

  async removeOrder() {
    await this.orderService.deleteOrder(this.isSelectedRemoveOrder).subscribe(() => {
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

  calculateTotalAndTax() {
    if (this.orders && this.orders.length) {
      this.subtotal = this.orders.map(order=> order.totalPrice).reduce((a,b) => a + b);
      this.tax = (this.subtotal * 15) / 100;
      this.priceWithTax = this.subtotal + this.tax;
    }
  }

  showSuccess() {
    this.toastr.success('Submitted Succesfully', 'Order Submitted');
  }

  navigateOrder() {
    this.router.navigateByUrl('/order');
  }

  removeAllOrders() {
    this.orderService.deleteOrders().subscribe(() => {
      this.orders = [];
    });
  }

  onCheckout() {
    this.orders.forEach(order => order.completed = true);
    const checkout: Checkout = {
      date: new Date(),
      subtotal: this.subtotal,
      userId: this.user.id,
      tax: this.tax,
      total: this.priceWithTax,
      orders: this.orders,
    };
    
    this.checkoutService.createCheckout(checkout).subscribe((res) => {
      if (res) {
        this.orders.forEach(order => {
          const newOrder: Order = {
            id: order.id,
            userId: order.userId,
            shopLocation: order.shopLocation,
            itemName: order.itemName,
            itemType: order.itemType,
            itemURL: order.itemURL,
            price: order.price,
            vegToppings: order.vegToppings,
            nonVegToppings: order.nonVegToppings,
            totalPrice: order.totalPrice,
            orderDate: order.orderDate,
            completed: true,
          }
          this.orderService.updateOrder(order.id, newOrder).subscribe(res => {
            console.log(res)
          });
        });
        this.showSuccess();
        this.navigateOrder();
      }
    });
  }
}
