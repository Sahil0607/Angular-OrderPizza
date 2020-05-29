import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PizzaListService } from '../pizza-list.service';
import { PizzaTopingsService } from '../pizza-topings.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  form;
  pizzaOption = [];
  toppings = [];
  shoapLocation = [
    { id: 1, name: 'San Francisco' },
    { id: 2, name: 'New York' },
    { id: 3, name: 'Chicago' }
  ];

  @Output() formData = new EventEmitter();

  constructor(private fb: FormBuilder, private pizzaListService: PizzaListService, 
    private pizzaTopingsService: PizzaTopingsService, private router: Router,
     private messageService: MessageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      shopLocation: ['', Validators.required],
      vegToppings: this.fb.array([], Validators.required),
      nonVegToppings: this.fb.array([], Validators.required),
      pizzaTypeId: ['', Validators.required],
      pizzaType: ['', Validators.required],
      pizzaName: ['', Validators.required],
      pizzaURL: ['', Validators.required],
      price: [null, Validators.required],
      totalPrice: [null],
    });

    this.addVegToppings();
    this.addNonVegToppings();
     this.pizzaOption = this.pizzaListService.getPizzaOption();
     this.toppings = this.pizzaTopingsService.getPizzaToppings();
  }

  selectLocation() {
    return this.pizzaOption.filter(pizza => pizza.city === this.form.controls.shopLocation.value);
  }

  listSelected(item?) {
    if (item) {
      this.form.controls.pizzaTypeId.setValue(item.id);
      this.form.controls.pizzaType.setValue(item.pizzaType);
      this.form.controls.pizzaName.setValue(item.name);
      this.form.controls.pizzaURL.setValue(item.Url);
      this.form.controls.price.setValue(item.price);
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
    // this.toppings.filter(topping => topping.pizzaType === 'Veg' && !this.form.controls.vegToppings.value.includes(topping.name));
    return this.toppings.filter(topping => topping.pizzaType === 'Veg');
  }

  addVegToppings(): void{
    (<FormArray>this.form.get('vegToppings')).push(new FormControl(''))
  } 

  removeVegTopping(index) {
    (<FormArray>this.form.get('vegToppings')).removeAt(index);
  }

  loadNonVegTopping() {
    return this.toppings.filter(topping => topping.pizzaType === 'Non-Veg');
  }

  addNonVegToppings(): void{
    (<FormArray>this.form.get('nonVegToppings')).push(new FormControl(''))
  }

  removeNonVegTopping(index) {
    (<FormArray>this.form.get('nonVegToppings')).removeAt(index);
  }

  onSubmit() {
    if (this.form.value.price) {
      const vegTopping = this.toppings.filter(a => this.form.value.vegToppings.includes(a.name)).map(a => a.price);
      const vegToppingPrice = vegTopping.reduce((a,b) => a + b);
      const nonVegTopping = this.toppings.filter(a => this.form.value.nonVegToppings.includes(a.name)).map(a => a.price);
      const nonVegToppingPrice = nonVegTopping.reduce((a,b) => a.price + b.price);
      const totalPrice = this.form.value.price + vegToppingPrice + nonVegToppingPrice;
      console.log(totalPrice);
      this.form.controls.totalPrice.setValue(totalPrice);

      this.messageService.sendMessage(this.form.value)
      // this.formData.emit(this.form.value);
      this.router.navigateByUrl('/order');
    }
  }
}
