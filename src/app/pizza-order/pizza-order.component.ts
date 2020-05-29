import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.css']
})
export class PizzaOrderComponent implements OnInit {
  subscription: Subscription;
  messages = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(message => this.messages.push(message));
    console.log(this.messages);
  }

}
