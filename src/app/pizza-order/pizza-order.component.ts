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
    this.messageService.getMessage().subscribe(msg => {
      if (msg !== {}) {
        console.log(msg);
        this.messages.push(msg.message)
      }
    });
    // console.log(this.messages);
  }

}




// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyCoYZIaRV-0fDR3L8E74Ahpj_ziRkhs-Bs",
//     authDomain: "order-pizza-b438c.firebaseapp.com",
//     databaseURL: "https://order-pizza-b438c.firebaseio.com",
//     projectId: "order-pizza-b438c",
//     storageBucket: "order-pizza-b438c.appspot.com",
//     messagingSenderId: "589503178973",
//     appId: "1:589503178973:web:591b53ffd046d6a7a95334",
//     measurementId: "G-EYPQN7MYQT"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>