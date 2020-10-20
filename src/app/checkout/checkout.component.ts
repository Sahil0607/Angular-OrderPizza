import { Component, OnInit } from '@angular/core';
import { slideIn } from '../animation/animation';
import { Subscription } from 'rxjs';
import { Order } from '../model/order.model';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../service/order.service';
import { ToppingService } from '../service/topping.service';
import { CheckoutService } from '../service/checkout.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Checkout } from '../model/checkout.model';
import { User } from '../model/user.model';
import { Topping } from '../model/topping.model';

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
  isSelectedEditOrder: Order;
  subtotal = 0;
  priceWithTax = 0;
  tax = 0;
  user: User;
  toppings: Topping[] = [];

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router,
              private toastr: ToastrService, private checkoutService: CheckoutService,
              private toppingService: ToppingService) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.user.subscribe(resUser => {
      this.user = resUser;
      if (resUser) {
        this.getOrders(resUser.id);
      }
    });
    this.toppingService.getToppings().subscribe(response => {
      this.toppings = response;
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

  getOrderVegTopping(order: Order) {
    if (order.vegToppings && order.vegToppings.length) {
      const newToppings = [];
      order.vegToppings.forEach(orderVegTpng => {
        if (this.toppings.filter(tpng => tpng.id === orderVegTpng)[0]) {
          newToppings.push(this.toppings.filter(tpng => tpng.id === orderVegTpng)[0]);
        }
      });
      return newToppings;
    }
  }

  getOrderNonVegTopping(order: Order) {
    if (order.nonVegToppings && order.nonVegToppings.length) {
      const newToppings = [];
      order.nonVegToppings.forEach(orderNonVegTpng => {
        if (this.toppings.filter(tpng => tpng.id === orderNonVegTpng)[0]) {
          newToppings.push(this.toppings.filter(tpng => tpng.id === orderNonVegTpng)[0]);
        }
      });
      return newToppings;
    }
  }

  removeSelectedOrder(key: string) {
    this.isSelectedRemoveOrder = key;
  }

  async removeOrder() {
    await this.orderService.deleteOrder(this.isSelectedRemoveOrder).subscribe(() => {
      const removeIndex = this.orders.map(item => item.id).indexOf(this.isSelectedRemoveOrder);
      this.orders.splice(removeIndex, 1);
      this.toastr.error('Deleted Successfully', 'Order Reg.');
      // this.toastr.warning('Deleted Successfully', 'Order Reg.');
    });
  }

  editSelectedOrder(order: Order) {
    this.isSelectedEditOrder = order;
  }

  editOrder() {
    this.router.navigate(['/update-order', this.isSelectedEditOrder.id]);
  }

  calculateTotalAndTax() {
    if (this.orders && this.orders.length) {
      this.subtotal = this.orders.map(order => order.totalPrice).reduce((a, b) => a + b);
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
    console.log(this.orders);
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
            completed: true,    // check completed in order.completed
          };
          this.orderService.updateOrder(order.id, newOrder).subscribe(response => {
            console.log(response);
          });
        });
        this.showSuccess();
        this.navigateOrder();
      }
    });
  }
}
