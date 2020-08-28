import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/menu.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
constructor(private http: HttpClient,) {}

  getMenuOption() {
    return [
      { item: 'Pizza', Url:'./../../assets/menu_image/menu_pizza.jpeg'},
      { item: 'Chicken', Url:'./../../assets/menu_image/menu_chicken.jpeg'},
      { item: 'Pasta', Url:'./../../assets/menu_image/menu_pasta.jpeg'},
      { item: 'Bread & Slice', Url:'./../../assets/menu_image/menu_bread&slice.jpeg'},
      { item: 'Desserts', Url:'./../../assets/menu_image/menu_desserts.jpeg'},
      { item: 'Drinks', Url:'./../../assets/menu_image/menu_drinks.jpeg'}
    ]
  }

  getMenu() {
    return this.http.get<Menu[]>('https://order-pizza-b438c.firebaseio.com/Menu.json?')
    .pipe(map(responseData => {
      const menu: Menu[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          menu.push({ ...responseData[key], id: key });  // ... use for copy nested data 
        }
      }
      return menu; 
    }));
  }

  createMenu() {
    const menu = this.getMenuOption();
    // this.http.delete('https://order-pizza-b438c.firebaseio.com/PizzaTypes.json');
    menu.forEach(menuItem => {
      return this.http.post('https://order-pizza-b438c.firebaseio.com/Menu.json', menuItem)
      .subscribe(type => console.log(type))
    });
  }
}
