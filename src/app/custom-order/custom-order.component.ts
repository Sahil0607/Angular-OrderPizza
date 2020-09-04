import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { MenuListService } from '../service/menu-list.service';
import { ToppingService } from '../service/topping.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../service/order.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { slideIn } from '../animation/animation';
import { Topping } from '../model/topping.model';
import { MenuList } from '../model/menu-list.model';

@Component({
  selector: 'app-custom-order',
  templateUrl: './custom-order.component.html',
  styleUrls: ['./custom-order.component.css'],
  animations: [ slideIn ],
})

export class CustomOrderComponent implements OnInit {
  item: string;
  form;
  id: string;
  itemOption: MenuList[] = [];
  shopLocation: string;
  toppings: Topping[] = [];
  editForm;
  selecteditemList: MenuList;

  constructor(private fb: FormBuilder, private menuListService: MenuListService,
    private toppingService: ToppingService, private router: Router, private authService: AuthService,
    private orderService: OrderService, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit() {
    this.form = this.fb.group({
      userId: [''],
      item: ['', Validators.required],
      shopLocation: ['', Validators.required],
      itemName: ['', Validators.required],
      itemType: ['', Validators.required],
      itemUrl: ['', Validators.required],
      // pizzaTypeId: ['', Validators.required],  add later and change data
      price: [null, Validators.required],
      vegToppings: this.fb.array([]),
      nonVegToppings: this.fb.array([]),
      totalPrice: [null],
      orderDate: [new Date()],
      completed: [false]
    });

    this.authService.user.subscribe(user => {
      if (user) {
        this.form.controls.userId.setValue(user.id);
      }
    });

    this.route.params.subscribe( params => this.id = params.id );
    this.route.params.subscribe( params => this.item = params.item );
    this.route.params.subscribe( params => this.shopLocation = params.location );

    if (this.item && this.shopLocation) {
      this.form.controls.item.setValue(this.item);
      this.form.controls.shopLocation.setValue(this.shopLocation);
    }

    // this.pizzaOption = this.itemListService.getPizzaOption();
    // this.toppings = this.pizzaTopingsService.getPizzaToppings();
    this.menuListService.getMenuList().subscribe(types => {
      this.itemOption = types;
    });
    this.toppingService.getToppings().subscribe(tpngs => {
      this.toppings = tpngs;
    });

    if (this.id) {
      this.orderService.getOrder(this.id).subscribe(val => {
        this.editForm = {...val};
        this.form.patchValue(val);

        console.log(this.editForm);
        if (this.editForm.vegToppings) {
          this.editForm.vegToppings.forEach(vegTopping => this.addVegToppings(vegTopping));
        }
        if (this.editForm.nonVegToppings) {
          this.editForm.nonVegToppings.forEach(nonVegTopping => this.addNonVegToppings(nonVegTopping));
        }
      });
     }
  }

  selectItem() {
    this.calculateToppingPrice();
    return this.itemOption.filter(itemObj => itemObj.item === this.form.controls.item.value);
  }

  listSelected(item) {
    console.log(item);
    this.selecteditemList = item;
    this.removeAllTopping();
    if (item) {
      // this.form.controls.pizzaTypeId.setValue(item.id);
      this.form.controls.itemType.setValue(item.itemInfo.type);
      this.form.controls.itemName.setValue(item.itemInfo.name);
      this.form.controls.itemUrl.setValue(item.itemInfo.url);
      this.form.controls.price.setValue(item.itemInfo.price);
    }

    item.itemInfo.toppings.forEach(topping => {
      if (this.toppings.filter(tpng => tpng.name === topping && tpng.itemType === 'Veg')[0]) {
        if (this.toppings.filter(tpng => tpng.name === topping)[0]) {
          this.addVegToppings(this.toppings.filter(tpng => tpng.name === topping)[0].id);
        }
      } else {
        if (this.toppings.filter(tpng => tpng.name === topping)[0]) {
          this.addNonVegToppings(this.toppings.filter(tpng => tpng.name === topping)[0].id);
        }
      }
    });
    this.calculateToppingPrice();
  }

  calculateToppingPrice() {
    let vegToppingsPrice = 0;
    let nonVegToppingsPrice = 0;

    if (this.form.value.vegToppings.length) {
      const vegToppingsPriceList = this.toppings.filter(a => this.form.value.vegToppings.includes(a.id)).map(b => b.price);
      vegToppingsPrice = vegToppingsPriceList.length ? vegToppingsPriceList.reduce((a, b) => a + b) : 0;
    }
    if (this.form.value.nonVegToppings.length) {
      const nonVegToppingsPriceList = this.toppings.filter(a => this.form.value.nonVegToppings.includes(a.id)).map(b => b.price);
      nonVegToppingsPrice = nonVegToppingsPriceList.length ? nonVegToppingsPriceList.reduce((a, b) => a + b) : 0;
    }
    const totalPrice = vegToppingsPrice + nonVegToppingsPrice + this.form.controls.price.value;
    this.form.controls.totalPrice.setValue(totalPrice);
  }

  loadVegTopping() {
    // return this.toppings.filter(topping => topping.itemType === 'Veg' && !this.form.value.vegToppings.includes(topping.name));
    return this.toppings.filter(topping => topping.itemType === 'Veg');
  }

  addVegToppings(vegTpngId?): void {
    const topping = new FormControl(vegTpngId ? vegTpngId : '', Validators.required);
    const vegTopping = this.form.get('vegToppings') as FormArray;
    vegTopping.push(topping);
  }

  removeVegTopping(index) {
    const vegTopping = this.form.get('vegToppings') as FormArray;
    vegTopping.removeAt(index);
    this.calculateToppingPrice();
  }

  removeAllTopping() {
    const vegTopping = this.form.get('vegToppings') as FormArray;
    const nonVegTopping = this.form.get('nonVegToppings') as FormArray;
    vegTopping.clear();
    nonVegTopping.clear();
    this.calculateToppingPrice();
  }

  loadNonVegTopping() {
    return this.toppings.filter(topping => topping.itemType === 'Non-Veg');
  }

  addNonVegToppings(nonVegTpngId?): void{
    const topping = new FormControl(nonVegTpngId ? nonVegTpngId : '', Validators.required);
    const nonVegTopping = this.form.get('nonVegToppings') as FormArray;
    nonVegTopping.push(topping);
  }

  removeNonVegTopping(index) {
    const nonVegArray = this.form.get('nonVegToppings') as FormArray;
    nonVegArray.removeAt(index);
    this.calculateToppingPrice();
  }

  showSuccess() {
    this.toastr.success('Submitted Succesfully', 'Order Register');
  }

  navigateOrder() {
    this.router.navigateByUrl('/checkout');
  }

  onSubmit() {
    if (this.form.value) {
      this.calculateToppingPrice();

      if (!this.id) {
        this.orderService.createOrder(this.form.value).subscribe(res => {
          if (res) {
            this.showSuccess();
            this.navigateOrder();
          }
        });
      } else {
        this.orderService.updateOrder(this.id, this.form.value).subscribe(res => {
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


 // newVegToppings(): FormGroup {
  //   return this.fb.group({
  //     id: ['', Validators.required],
  //     name: ['', Validators.required],
  //     itemType: ['', Validators.required],
  //     price: ['', Validators.required]
  //   });
  // }

  // if (this.form.controls.pizzaName.value) {
    //   switch (this.form.controls.pizzaName.value) {
    //     case 'Cheese Pizza':
    //        this.addVegToppings('Cheese');
    //       break;
    //     case 'Veggie Pizza':
    //       this.addVegToppings('Cheese');
    //       this.addVegToppings('Onion');
    //       this.addVegToppings('Pineple');
    //       break;
    //     case 'Pepperoni Pizza':
    //       this.addVegToppings('Cheese');
    //       this.addNonVegToppings('Pepperoni');
    //       break;
    //     case 'Meat Pizza':
    //       this.addVegToppings('Cheese');
    //       this.addNonVegToppings('Meat');
    //       break;
    //   }
    // }

    // calculateToppingPrice() {
      // const vegTopping = this.toppings.filter(a => this.form.value.vegToppings.includes(a.name)).map(a => a.price);
      // const vegToppingPrice = vegTopping.length ? vegTopping.reduce((a,b) => a + b) : 0;
      // const nonVegTopping = this.toppings.filter(a => this.form.value.nonVegToppings.includes(a.name)).map(a => a.price);
      // const nonVegToppingPrice = nonVegTopping.length ? nonVegTopping.reduce((a,b) => a + b) : 0;
      // const totalPrice = this.form.value.price + vegToppingPrice + nonVegToppingPrice;
      // this.form.controls.totalPrice.setValue(totalPrice);
    // }
