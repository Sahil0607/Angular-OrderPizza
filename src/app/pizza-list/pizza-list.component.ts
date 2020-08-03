import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { PizzaListService } from '../service/pizza-list.service';
import { PizzaTopingsService } from '../service/pizza-topings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../service/message.service';
import { PizzaOrderRealDBFirebaseService } from '../service/pizza-order-real-db-firebase.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { trigger, state, style, transition, keyframes, animate } from '@angular/animations';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css'],
  animations: [
    trigger('orderInAnimation', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('void => *', [     // Style for entering. void to any
        animate(1000, keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0
          }),
          style({
            opacity: 0.5,
            transform: 'translateX(-67px)',
            offset: 0.3
          }),
          style({
            opacity: 1,
            transform: 'translateX(-34px)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'translateX(0px)',
            offset: 1
          }),
        ]))
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0,
        }))
      ])
    ])
  ],
})

export class PizzaListComponent implements OnInit {
  form;
  id: string;
  pizzaOption = [];
  toppings = [];
  shoapLocation = [
    { id: 1, name: 'San Francisco' },
    { id: 2, name: 'New York' },
    { id: 3, name: 'Chicago' }
  ];
  editForm;

  constructor(private fb: FormBuilder, private pizzaListService: PizzaListService, 
    private pizzaTopingsService: PizzaTopingsService, private router: Router,
     private messageService: MessageService, private pizzaOrderRealDBFirebaseService: PizzaOrderRealDBFirebaseService,
     private route: ActivatedRoute, private toastr: ToastrService, private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe( params => this.id = params.id );
    this.form = this.fb.group({
      userId: [''],
      shopLocation: ['', Validators.required],
      vegToppings: this.fb.array([]),
      nonVegToppings: this.fb.array([]),
      pizzaTypeId: ['', Validators.required],
      pizzaType: ['', Validators.required],
      pizzaName: ['', Validators.required],
      pizzaURL: ['', Validators.required],
      price: [null, Validators.required],
      totalPrice: [null],
      orderDate: [new Date()],
    });

    this.authService.user.subscribe(user => {
          if (user) {
            this.form.controls.userId.setValue(user.id);
          }
    });

     this.pizzaOption = this.pizzaListService.getPizzaOption();
     this.toppings = this.pizzaTopingsService.getPizzaToppings();

     if (this.id) {
      this.pizzaOrderRealDBFirebaseService.getPizzaOrder(this.id).subscribe(val => {
        this.editForm = {...val};
        this.form.patchValue(val);

        if (val['vegToppings']) {
          val['vegToppings'].forEach(vegTopping => this.addVegToppings(vegTopping));
        }
        if (val['nonVegToppings']) {
          val['nonVegToppings'].forEach(nonVegTopping => this.addNonVegToppings(nonVegTopping));
        }
      });
     }
  }

  selectLocation() {
    return this.pizzaOption.filter(pizza => pizza.city === this.form.controls.shopLocation.value);
  }

  listSelected(item?) {
    this.removeAllTopping();
    if (item) {
      this.form.controls.pizzaTypeId.setValue(item.id);
      this.form.controls.pizzaType.setValue(item.pizzaType);
      this.form.controls.pizzaName.setValue(item.name);
      this.form.controls.pizzaURL.setValue(item.Url);
      this.form.controls.price.setValue(item.price);
    }
    
    if (this.form.controls.pizzaName.value) {
      switch (this.form.controls.pizzaName.value) {
        case 'Cheese Pizza':
           this.addVegToppings('Cheese');
          break;
        case 'Veggie Pizza':
          this.addVegToppings('Cheese');
          this.addVegToppings('Onion');
          this.addVegToppings('Pineple');
          break;
        case 'Pepperoni Pizza':
          this.addVegToppings('Cheese');
          this.addNonVegToppings('Pepperoni');
          break;
        case 'Meat Pizza':
          this.addVegToppings('Cheese');
          this.addNonVegToppings('Meat');
          break;
      }
    }
  }

  // newVegToppings(): FormGroup {
  //   return this.fb.group({
  //     id: ['', Validators.required],
  //     name: ['', Validators.required],
  //     pizzaType: ['', Validators.required],
  //     price: ['', Validators.required]
  //   });
  // }

  loadVegTopping() {
    // return this.toppings.filter(topping => topping.pizzaType === 'Veg' && !this.form.value.vegToppings.includes(topping.name));
    return this.toppings.filter(topping => topping.pizzaType === 'Veg');
  }

  addVegToppings(vegTopping?): void {
    // Add css validator red border
    let topping = new FormControl(vegTopping ? vegTopping : '', Validators.required);
    (<FormArray>this.form.get('vegToppings')).push(topping);
  } 

  removeVegTopping(index) {
    (<FormArray>this.form.get('vegToppings')).removeAt(index);
  }

  removeAllTopping() {
    (<FormArray>this.form.get('vegToppings')).clear();
    (<FormArray>this.form.get('nonVegToppings')).clear();
  }

  loadNonVegTopping() {
    return this.toppings.filter(topping => topping.pizzaType === 'Non-Veg');
  }

  addNonVegToppings(nonVegTopping?): void{
    let topping = new FormControl(nonVegTopping ? nonVegTopping : '', Validators.required);
    (<FormArray>this.form.get('nonVegToppings')).push(topping);
  }

  removeNonVegTopping(index) {
    (<FormArray>this.form.get('nonVegToppings')).removeAt(index);
  }

  showSuccess() {
    this.toastr.success('Submitted Succesfully', 'Pizza Register');
  }

  calculateToppingPrice() {
    const vegTopping = this.toppings.filter(a => this.form.value.vegToppings.includes(a.name)).map(a => a.price);
    const vegToppingPrice = vegTopping.length ? vegTopping.reduce((a,b) => a + b) : 0;
    const nonVegTopping = this.toppings.filter(a => this.form.value.nonVegToppings.includes(a.name)).map(a => a.price);
    const nonVegToppingPrice = nonVegTopping.length ? nonVegTopping.reduce((a,b) => a + b) : 0;
    const totalPrice = this.form.value.price + vegToppingPrice + nonVegToppingPrice;
    this.form.controls.totalPrice.setValue(totalPrice);
  }

  navigateOrder() {
    this.router.navigateByUrl('/order');
  }

  onSubmit() {
    if (this.form.value) {
      this.calculateToppingPrice();

      if (!this.id) {
        
        this.pizzaOrderRealDBFirebaseService.createPizzaOrder(this.form.value).subscribe(res => {
          if (res) {
            this.showSuccess();
            this.navigateOrder();
          }
        });
      } else {
        this.pizzaOrderRealDBFirebaseService.updatePizzaOrder(this.id, this.form.value).subscribe(res => {
          if (res) {
            this.showSuccess();
           this.navigateOrder();
          }
        });
      }
      
       // Local Data Observable
      // this.messageService.sendMessage(this.form.value)
    }
  }
}
