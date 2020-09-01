export class MenuList {
    public id?: string;
    public item: string;
    public itemInfo: ItemInfo;
}

class ItemInfo {
    public name: string;
    public type: string;
    public toppings: string[];
    public price: number;
    public url: string;
}