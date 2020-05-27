import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Controlval } from './controlval';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  selectedCity = '';
  selectedList = '';
  savedPizzaInfo = '';
  selectedOption = '';
  savedTopping = [];
  selectedPizzaPrice: 0;
  selectedTopping = [];
  selectedToppingPrice: any = [];
  totalTpPrice = 0;
  TotalPizzaPrice = 0;
  selectedTP = [];
  submitedData = {
    city: '',
    pizzaTypes: '',
    toppingType: [],
    opt: '',
    tprice: 0,
  };
  url = './../../assets/sf_cheese_pizza.jpeg';

  private arr: any =
     {price: null, selected: false}
    ;

  shoapLocation = [
    { id: 1, name: 'San Francisco' },
    { id: 2, name: 'New York' },
    { id: 3, name: 'Chicago' }
  ];
  form: FormGroup;

  private pizzaOption = [
    { id: 1, name: 'SF Cheese Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 10, Url:
    './../../assets/sf_cheese_pizza.jpeg' },
    { id: 2, name: 'SF Veggie Pizza', city: 'San Francisco', pizzaType: 'Veg', price: 11, Url:
    './../../assets/sf_veggie_pizza.jpeg'},
    { id: 3, name: 'SF Peproni Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 12, Url:
    './../../assets/sf_pepperoni_pizza.jpeg' },
    { id: 4, name: 'SF Meat Pizza', city: 'San Francisco', pizzaType: 'Non-Veg', price: 13, Url:
    './../../assets/sf_meat_pizza.jpeg' },
    { id: 5, name: 'NY Cheese Pizza', city: 'New York', pizzaType: 'Veg', price: 10, Url:
    './../../assets/ny_cheese_pizza.jpeg' },
    { id: 6, name: 'NY Veggie Pizza', city: 'New York', pizzaType: 'Veg', price: 11, Url:
    './../../assets/ny_veggie_pizza.jpeg' },
    { id: 7, name: 'NY Peproni Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 12, Url:
    './../../assets/ny_pepperoni_pizza.jpeg' },
    { id: 8, name: 'NY Meat Pizza', city: 'New York', pizzaType: 'Non-Veg', price: 13, Url:
    './../../assets/ny_meat_pizza.jpeg' },
    { id: 9, name: 'CG Cheese Pizzaa', city: 'Chicago', pizzaType: 'Veg', price: 10, Url:
    './../../assets/chicago_cheese_pizza.jpeg' },
    { id: 10, name: 'CG Veggie Pizza', city: 'Chicago', pizzaType: 'Veg', price: 11, Url:
    './../../assets/chicago_veggie_pizza.jpeg' },
    { id: 11, name: 'CG Peproni Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 12, Url:
    './../../assets/chicago_pepperoni_pizza.jpeg' },
    { id: 12, name: 'CG Meat Pizza', city: 'Chicago', pizzaType: 'Non-Veg', price: 13, Url:
    './../../assets/chicago_meat_pizza.jpeg' }
  ];

  toppings = [
    { id: 1, name: 'Cheese', pizzaType: 'Veg', selected: false, price: 1 },
    { id: 2, name: 'Onion', pizzaType: 'Veg', selected: false, price: 2 },
    { id: 3, name: 'Spinach', pizzaType: 'Veg', selected: false, price: 3 },
    { id: 4, name: 'Pineple', pizzaType: 'Veg', selected: false, price: 4 },
    { id: 5, name: 'Pepperoni', pizzaType: 'Non-Veg', selected: false, price: 1 },
    { id: 6, name: 'Tometo', pizzaType: 'Veg', selected: false, price: 2 },
    { id: 7, name: 'Meat', pizzaType: 'Non-Veg', selected: false, price: 3 },
    { id: 8, name: 'Beef', pizzaType: 'Non-Veg', selected: false, price: 4 },
    { id: 9, name: 'Bacon', pizzaType: 'Non-Veg', selected: false, price: 1 },
    { id: 10, name: 'Ham', pizzaType: 'Non-Veg', selected: false, price: 2 },
    { id: 11, name: 'Sausage', pizzaType: 'Non-Veg', selected: false, price: 3 },
    { id: 12, name: 'Chicken', pizzaType: 'Non-Veg', selected: false, price: 4 },
    { id: 13, name: 'Broccoli', pizzaType: 'Veg', selected: false, price: 1 },
    { id: 14, name: 'Jalapeno', pizzaType: 'Non-Veg', selected: false, price: 2 },
    { id: 15, name: 'Mushroom', pizzaType: 'Veg', selected: false, price: 3 },
    { id: 16, name: 'Cheese', pizzaType: 'Non-Veg', selected: false, price: 4 }
  ];

  filteredPizzas = [];
  filteredItems = [];
  showForm = false;

  constructor(private formBuilder: FormBuilder) {
    const controls = this.toppings.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to true (checked)
    this.form = this.formBuilder.group({
      toppings: new FormArray(controls)
    });
  }

  ngOnInit() {
  }

  selectLocation() {
    this.filteredPizzas = this.pizzaOption.filter((pizza) => {
      return pizza.city === this.selectedCity;
    });
  }

  listSelected(item?) {
    if (item) {
      this.selectedList = item.pizzaType;
      this.selectedOption = item.name;
      this.selectedPizzaPrice = item.price;
    }
    if (this.selectedList === 'Veg') {
      this.filteredItems = this.toppings.filter((tpng) => {
        if (tpng.pizzaType === this.selectedList) {
          if (tpng.name === 'Mushroom') {
            tpng.selected = true;
            this.selectedTopping.push(tpng);
            this.selectedToppingPrice.push(tpng.price);
            this.selectedTP.push(tpng.selected);
          }
          return tpng;
        }
      });
    } else if (this.selectedList === 'Non-Veg') {
      this.filteredItems = this.toppings.filter((tpng) => {
        if (tpng.name === 'Pepperoni') {
          tpng.selected = true;
          this.selectedTopping.push(tpng);
          this.selectedToppingPrice.push(tpng.price);
          this.selectedTP.push(tpng.selected);
        }
        return tpng;
      });
    }
    console.log(this.filteredItems);
    console.log(this.selectedList);
  }
  selectedLists(data) {
   this.selectedToppingPrice.push(data.price);
   this.selectedTP.push(data.selected);
   console.log(this.selectedToppingPrice);
   // this.selecte
  }
  printData() {
    this.submitedData.city = this.selectedCity;
    this.submitedData.pizzaTypes = this.selectedList;
    this.submitedData.opt = this.selectedOption;
    this.submitedData.toppingType = this.savedTopping;
    this.arr.price = this.selectedToppingPrice;
    this.arr.selected = this.selectedTP;
   // let sum = null;
    let sum = 0;
    for (let i = 0; i < this.arr.price.length; i++) {
      sum += this.arr.price[i];
      this.totalTpPrice = sum;
    }
   console.log(sum);
   // console.log(this.arr);
   this.TotalPizzaPrice = this.selectedPizzaPrice + this.totalTpPrice;
  }



/*
arr = [1,6,90,6,4];
var sum = 0;
for(i = 0; i <arr.length;i++) {
  sum = sum + i;
}
 return sum;

 arr = [{'price':10, 'selected': true},{'price':20, 'selected': false},{'price':155, 'selected': false},{'price':10, 'selected': true}]
 sum = 0;
  arr.forEach(item => {
    if (item.selected) {
      sum += item.price
    }
  });
  return sum;

*/

}
