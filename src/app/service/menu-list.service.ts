import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuList } from '../model/menu-list.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuListService {
  constructor(private http: HttpClient,) {}

  getMenuList() {
    return this.http.get<MenuList[]>('https://order-pizza-b438c.firebaseio.com/MenuList.json?')
    .pipe(map(responseData => {
      const getMenuList: MenuList[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          getMenuList.push({ ...responseData[key], id: key });  // ... use for copy nested data 
        }
      }
      return getMenuList; 
    }));
  }

  createMenuList() {
    const menuList = this.getMenuOption();
    // this.http.delete('https://order-pizza-b438c.firebaseio.com/MenuList.json');
    menuList.forEach(menuOption => {
      return this.http.post('https://order-pizza-b438c.firebaseio.com/MenuList.json', menuOption)
      .subscribe(type => console.log(type))
    });
  }

  getMenuOption() {
    return [
      {
        item: 'Pizza',
        itemInfo:{
          name: 'Cheese Pizza',   
          type: 'Veg', 
          toppings: ['Cheese'], 
          price: 6, 
          url: './../../assets/item_images/pizza_image/cheese_pizza.jpeg'
        },
      },
      {
        item: 'Pizza',
        itemInfo:{
          name: 'Veggie Pizza',    
          type: 'Veg', 
          toppings: ['Cheese','Onion','Pineple'], 
          price: 7, 
          url: './../../assets/item_images/pizza_image/veggie_pizza.jpeg'
        },
      },
      {
        item: 'Pizza',
        itemInfo: {
          name: 'Pepperoni Pizza',    
          type: 'Non-Veg', 
          toppings: ['Cheese', 'Pepperoni'], 
          price: 8, 
          url: './../../assets/item_images/pizza_image/pepperoni_pizza.jpeg'
        },
      },
      {
        item: 'Pizza',
        itemInfo: {
          name: 'Meat Pizza',    
          type: 'Non-Veg', 
          toppings: ['Cheese', 'Meat'], 
          price: 8, 
          url: './../../assets/item_images/pizza_image/meat_pizza.jpeg'
        }
      },
      {
        item: 'Pasta',
        itemInfo: {
          name: 'Cheese Pasta',   
          type: 'Veg', 
          toppings: ['Cheese'], 
          price: 6, 
          url: './../../assets/item_images/pizza_image/cheese_pizza.jpeg'
        },
      },
      {
        item: 'Pasta',
        itemInfo: {
          name: 'Veggie Pasta',    
          type: 'Veg', 
          toppings: ['Cheese'], 
          price: 7, 
          url: './../../assets/item_images/pizza_image/veggie_pizza.jpeg'
        },
      },
      {
        item: 'Pasta',
        itemInfo: {
          name: 'Pepperoni Pasta',    
          type: 'Non-Veg', 
          toppings: ['Cheese'], 
          price: 8, 
          url: './../../assets/item_images/pizza_image/pepperoni_pizza.jpeg'
        },
      },
      {
        item: 'Pasta',
        itemInfo:  {
          name: 'Meat Pasta',    
          type: 'Non-Veg', 
          toppings: ['Cheese'], 
          price: 8, 
          url: './../../assets/item_images/pizza_image/meat_pizza.jpeg'
        }
      },
    ];
  } 
}


// [
//   { item: 'Pizza',
//     city: 'San Francisco', 
//     itemInfo: {
//       name: 'Cheese Pizza',   
//       type: 'Veg', 
//       price: 6, 
//       url: './../../assets/sf_cheese_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'San Francisco', 
//     itemInfo: {
//       name: 'Veggie Pizza',    
//       type: 'Veg', 
//       price: 7, 
//       Url: './../../assets/sf_veggie_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'San Francisco', 
//     itemInfo: {
//       name: 'Pepperoni Pizza',    
//       type: 'Non-Veg', 
//       price: 8, 
//       Url: './../../assets/sf_pepperoni_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'San Francisco', 
//     itemInfo: {
//       name: 'Meat Pizza',    
//       type: 'Non-Veg', 
//       price: 8, 
//       Url: './../../assets/sf_meat_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'New York',
//     itemInfo: {
//       name: 'Cheese Pizza', 
//       type: 'Veg', 
//       price: 6, 
//       Url: './../../assets/ny_cheese_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'New York',
//     itemInfo: {
//       name: 'Veggie Pizza', 
//       type: 'Veg', 
//       price: 7, 
//       Url: './../../assets/ny_veggie_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'New York',
//     itemInfo: {
//       name: 'Pepperoni Pizza', 
//       type: 'Non-Veg', 
//       price: 8, 
//       Url: './../../assets/ny_pepperoni_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'New York',
//     itemInfo: {
//       name: 'Meat Pizza', 
//       type: 'Non-Veg', 
//       price: 8, 
//       Url: './../../assets/ny_meat_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'Chicago',
//     itemInfo: {
//       name: 'Cheese Pizza',     
//       type: 'Veg', 
//       price: 6, 
//       Url: './../../assets/chicago_cheese_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'Chicago',
//     itemInfo: {
//       name: 'Veggie Pizza',     
//       type: 'Veg', 
//       price: 7, 
//       Url: './../../assets/chicago_veggie_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'Chicago',
//     itemInfo: {
//       name: 'Pepperoni Pizza',     
//       type: 'Non-Veg', 
//       price: 8, 
//       Url: './../../assets/chicago_pepperoni_pizza.jpeg'
//     }
//   },
//   { item: 'Pizza',
//     city: 'Chicago',
//     itemInfo: {
//       name: 'Meat Pizza',     
//       type: 'Non-Veg', 
//       price: 8, 
//       Url: './../../assets/chicago_meat_pizza.jpeg'
//     }
//   },
//   // Change Image and img folder
//   { item: 'Pasta',
//     city: 'Chicago',
//     itemInfo: {
//       name: 'Veg Pasta',     
//       type: 'Veg', 
//       price: 5, 
//       Url: './../../assets/chicago_meat_pizza.jpeg'
//     }
//   }, 
//   { item: 'Pasta',
//     city: 'Chicago',
//     itemInfo: {
//       name: 'Chicken Alfredo',     
//       type: 'Non-Veg', 
//       price: 5, 
//       Url: './../../assets/chicago_meat_pizza.jpeg'
//     }
//   }, 
//   { item: 'Pasta',
//     city: 'Chicago',
//     itemInfo: {
//       name: 'Italian Sausage Marinara',     
//       type: 'Non-Veg', 
//       price: 5, 
//       Url: './../../assets/chicago_meat_pizza.jpeg'
//     }
//   }, 
// ];