export class Order {
    public id?: string;
    public userId: string;
    public shopLocation: string;
    public itemName: string;
    public itemType: string;
    public itemURL: string;
    public price: number;
    public vegToppings: string[];
    public nonVegToppings: string[];
    public totalPrice: number;
    public orderDate: Date;
    public completed: boolean;
}