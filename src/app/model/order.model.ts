export interface Order {
    id?: string;
    userId: string;
    shopLocation: string;
    itemName: string,
    itemType: string,
    itemURL: string,
    price: number,
    vegToppings: string[];
    nonVegToppings: string[];
    totalPrice: number,
    orderDate: Date,
}