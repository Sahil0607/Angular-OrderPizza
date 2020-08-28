export interface MenuList {
    id?: string,
    item: string,
    itemInfo: ItemInfo,
}

interface ItemInfo {
    name: string,
    type: string,
    toppings: string[],
    price: number,
    url: string
}