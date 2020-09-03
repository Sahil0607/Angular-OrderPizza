import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from '../model/menu.model';
import { MenuService } from '../service/menu.service';
import { slideIn } from '../animation/animation';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [slideIn],
})
export class MenuComponent implements OnInit {
  subscription: Subscription;
  menu: Menu[] = [];
  isLoading = false;
  error = null;
  form;
  shopLocation:String[] = ['Chicago', 'Dallas', 'San Fransisco', 'New York'];
  
  constructor(private menuService: MenuService, private router: Router, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.form = this.fb.group({
      shopLocation: ['', Validators.required],
    });

    this.menuService.getMenu().subscribe(menuitem => {
      if(menuitem) {
        this.menu = menuitem;
      }
      this.isLoading = false;
    }, error => {
      this.error = error;
    });
  }

  onCreateMenu() {
    // For testing purpose
    this.menuService.createMenu();
  }

  onSelectMenu(menuItem) {
    if (!this.form.value.shopLocation) {
      return alert('Please select shop location');
    }
    this.router.navigate(['/menu-item', menuItem.item, this.form.value.shopLocation]);
  }

  onSubmit(){}
}
