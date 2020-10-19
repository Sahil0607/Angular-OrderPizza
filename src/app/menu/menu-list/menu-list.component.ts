import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { slideIn } from 'src/app/animation/animation';
import { MenuListService } from 'src/app/service/menu-list.service';
import { ToppingService } from 'src/app/service/topping.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Topping } from 'src/app/model/topping.model';
import { OrderService } from 'src/app/service/order.service';
import { ToastrService } from 'ngx-toastr';
import { MenuList } from 'src/app/model/menu-list.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  animations: [ slideIn ],
})
export class MenuListComponent implements OnInit {
  item: string;
  form;
  itemOption: MenuList[];
  toppings: Topping[] = [];
  selecteditemList: MenuList;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router,
              private menuListService: MenuListService, private toppingService: ToppingService,
              private authService: AuthService, private orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      userId: [''],
      item: ['', Validators.required],
      shopLocation: ['', Validators.required],
      itemName: ['', Validators.required],
      itemType: ['', Validators.required],
      itemUrl: ['', Validators.required],
      // pizzaTypeId: ['', Validators.required], add later and change data
      price: [null, Validators.required],
      vegToppings: this.fb.array([]),
      nonVegToppings: this.fb.array([]),
      totalPrice: [null],
      orderDate: [new Date()],
      completed: [false],
    });

    this.route.params.subscribe( params => {
      if (params.location) {
        this.form.controls.shopLocation.setValue(params.location);
      }
      this.item = params.item;
      this.form.controls.item.setValue(this.item);
    });

    this.authService.user.subscribe(user => {
      if (user) {
        this.form.controls.userId.setValue(user.id);
      }
    });

    this.toppingService.getToppings().subscribe(tpngs => {
      this.toppings = tpngs;
    });

    this.fatchMenuList();
  }

  fatchMenuList() {
    this.menuListService.getMenuList().subscribe(types => {
      this.itemOption = types;
    });
  }

  getItems() {
    this.calculateToppingPrice();
    return this.itemOption.filter(itemObj => itemObj.item === this.form.controls.item.value);
  }

  onCreateItemTopping() {
    // For testing purpose
    this.toppingService.createToppings();
  }

  onCreateItemTypes() {
    // For testing purpose
    this.menuListService.createMenuList();
  }

  listSelected(item) {
    this.removeAllTopping();
    this.selecteditemList = item;
    if (item === 'customItem') {
      // this.router.navigateByUrl('/custom-order');
      this.router.navigate(['/custom-order', this.item, this.form.value.shopLocation ]);
    } else {
      this.form.controls.itemType.setValue(item.itemInfo.type);
      this.form.controls.itemName.setValue(item.itemInfo.name);
      this.form.controls.itemUrl.setValue(item.itemInfo.url);
      this.form.controls.price.setValue(item.itemInfo.price);
      // this.form.controls.itemTypeId.setValue(item.id); // Add id and adjust data

      if (item.itemInfo.toppings && item.itemInfo.toppings.length) {
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
    }
  }

  addVegToppings(vegTpngId?): void {
    const topping = new FormControl(vegTpngId ? vegTpngId : '');
    const vegTopping = this.form.get('vegToppings') as FormArray;
    vegTopping.push(topping);
  }

  addNonVegToppings(nonVegTpngId?): void{
    const topping = new FormControl(nonVegTpngId ? nonVegTpngId : '');
    const nonVegTopping = this.form.get('nonVegToppings') as FormArray;
    nonVegTopping.push(topping);
  }

  removeAllTopping() {
    const vegTopping = this.form.get('vegToppings') as FormArray;
    const nonVegTopping = this.form.get('nonVegToppings') as FormArray;
    vegTopping.clear();
    nonVegTopping.clear();
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

  showSuccess() {
    this.toastr.success('Submitted Succesfully', 'Order Register');
  }

  navigateOrder() {
    this.router.navigateByUrl('/checkout');
  }

  onSubmit() {
    if (this.form.value) {
      this.orderService.createOrder(this.form.value).subscribe(res => {
        if (res) {
          this.showSuccess();
          this.navigateOrder();
        }
      });
    }
  }
}
