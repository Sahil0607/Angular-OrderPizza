import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PizzaOrderFirebaseService } from '../service/pizza-order-firebase.service';
import { Router } from '@angular/router';
import { PizzaOrder } from '../pizza-order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  subscription: Subscription;
  messages = [];

  constructor(private messageService: MessageService, private pizzaOrderFirebaseService: PizzaOrderFirebaseService,
    private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Observable Used
    // this.messageService.getMessage().subscribe(msg => {
    //   if (msg !== {}) {
    //     this.messages.push(msg.message)
    //   }
    // });

    // Firebase database
    // this.pizzaOrderFirebaseService.getPizzaOrderList().snapshotChanges().pipe(
    //   map(changes => 
    //     changes.map(c => 
    //       ({key: c.payload.key, ...c.payload.val()})
    //       )
    //     )
    // ).subscribe(orders => this.messages = orders);

    // Firebase Cloud database
    this.pizzaOrderFirebaseService.getPizzaOrderList().subscribe(actionArrays => {
      this.messages = actionArrays.map(item => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as PizzaOrder),
        } as PizzaOrder
      }) 
    });
  }

  removeAllOrders() {
    this.pizzaOrderFirebaseService.deleteAllPizzaOrder();
  }

  removeOrder(key: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.pizzaOrderFirebaseService.deletePizzaOrder(key);
      this.toastr.warning('Deleted Successfully', 'Pizza Reg.');
    }
  }

  editOrder(id: string) {
    this.router.navigate(['/create', id]);
  }

}




