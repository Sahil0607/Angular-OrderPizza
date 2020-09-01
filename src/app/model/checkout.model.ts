import { Order } from './order.model';

export class Checkout {
    public id?: string;
    public date: Date;
    public userId: string;
    public subtotal: number;
    public tax: number;
    public total: number;
    public orders: Order[];
}