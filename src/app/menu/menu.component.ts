import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from '../model/menu.model';
import { MenuService } from '../service/menu.service';
import { slideIn } from '../animation/animation';
import { Router } from '@angular/router';

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
  
  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
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
    this.router.navigate(['/menu-item', menuItem.item]);
  }
}
