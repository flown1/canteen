import {ORDER_STATUS} from "../constants/OrderStatus";
import OrderDataItem from "./OrderDataItem";

export default class OrderData {
    items: Array<OrderDataItem>;
    price: number;
    status: ORDER_STATUS;
    ownerEmail: string;
    ownerName: string;
    code: string;
    date: string;

    constructor(items: Array<OrderDataItem>, ownerEmail: string, ownerName: string, status: ORDER_STATUS, code: string, date: string) {
        this.items = items;
        this.ownerEmail = ownerEmail;
        this.ownerName = ownerName;
        this.status = status;

        this.price = this._countTotalPrice();
        this.code = code;
        this.date = date;
    }

    private _countTotalPrice(): number {
        const items = this.items;
        let total = 0;
        for (let i = 1; i < items.length; i++) {
            const item = items[i];
            total += item.dish.price;
        }
        return total;
    }
}