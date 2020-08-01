export interface Order {
    id?: string;
    userId: string;
    shopLocation: string;
    pizzaTypeId: number,
    pizzaType: string,
    pizzaName: string,
    pizzaURL: string,
    price: number,
    totalPrice: number,
    orderDate: Date,
    vegToppings: string[];
    nonVegToppings: string[];
}