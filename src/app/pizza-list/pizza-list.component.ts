import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PizzaListService } from '../pizza-list.service';
import { PizzaTopingsService } from '../pizza-topings.service';

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

  constructor(private fb: FormBuilder, private pizzaListService: PizzaListService, 
    private pizzaTopingsService: PizzaTopingsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      shopLocation: [''],
      vegToppings: this.fb.array([]),
      nonVegToppings: this.fb.array([]),
    });
     this.pizzaOption = this.pizzaListService.getPizzaOption();
     this.toppings = this.pizzaTopingsService.getPizzaToppings();
  }

  selectLocation() {
    return this.pizzaOption.filter(pizza => pizza.city === this.form.controls.shopLocation.value);
  }

  newVegToppings(): FormGroup {
    return this.fb.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      // pizzaType: ['', Validators.required],
      // price: ['', Validators.required]
    });
  }

  addVegToppings(): void{
    (<FormArray>this.form.get('vegToppings')).push(this.newVegToppings())
  } 

  listSelected(item?) {
    console.log(item);
    // if (item) {
    //   this.selectedList = item.pizzaType;
    //   this.selectedOption = item.name;
    //   this.selectedPizzaPrice = item.price;
    // }
    // if (this.selectedList === 'Veg') {
    //   this.filteredItems = this.toppings.filter((tpng) => {
    //     if (tpng.pizzaType === this.selectedList) {
    //       if (tpng.name === 'Mushroom') {
    //         tpng.selected = true;
    //         this.selectedTopping.push(tpng);
    //         this.selectedToppingPrice.push(tpng.price);
    //         this.selectedTP.push(tpng.selected);
    //       }
    //       return tpng;
    //     }
    //   });
    // } else if (this.selectedList === 'Non-Veg') {
    //   this.filteredItems = this.toppings.filter((tpng) => {
    //     if (tpng.name === 'Pepperoni') {
    //       tpng.selected = true;
    //       this.selectedTopping.push(tpng);
    //       this.selectedToppingPrice.push(tpng.price);
    //       this.selectedTP.push(tpng.selected);
    //     }
    //     return tpng;
    //   });
    // }
  }
  // selectedLists(data) {
  //  this.selectedToppingPrice.push(data.price);
  //  this.selectedTP.push(data.selected);
  //  console.log(this.selectedToppingPrice);
  // }
  // printData() {
  //   this.submitedData.city = this.selectedCity;
  //   this.submitedData.pizzaTypes = this.selectedList;
  //   this.submitedData.opt = this.selectedOption;
  //   this.submitedData.toppingType = this.savedTopping;
  //   this.arr.price = this.selectedToppingPrice;
  //   this.arr.selected = this.selectedTP;
  //   let sum = 0;
  //   for (let i = 0; i < this.arr.price.length; i++) {
  //     sum += this.arr.price[i];
  //     this.totalTpPrice = sum;
  //   }
  //  this.TotalPizzaPrice = this.selectedPizzaPrice + this.totalTpPrice;
  // }
  onSubmit() {
    console.log(this.form);
  }
}
