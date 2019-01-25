import {ORDER_STATUS} from "../constants/OrderStatus";
import OrderDataItem from "./OrderDataItem";

export default class OrderData {
    id: string;
    items: Array<OrderDataItem>;
    price: number;
    status: ORDER_STATUS;
    ownerEmail: string;
    ownerName: string;
    code: string;
    date: string;

    constructor(id: string, items: Array<OrderDataItem>, ownerEmail: string, ownerName: string, status: ORDER_STATUS, code: string, date: string) {
        this.id = id;
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
        console.log("Items to count price:", items);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            const itemPrice = item.dish.price * item.quantity;
            console.log(item.quantity, "x ", item.dish.namePL, "( ", item.dish.price, " ) = ", itemPrice);
            total += itemPrice;
        }
        return total;
    }
}