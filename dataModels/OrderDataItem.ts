import DishData from "./DishData";

export default class OrderDataItem {
    dish: DishData;
    quantity: number;

    constructor(dish: DishData, quantity: number) {
        this.dish = dish;
        this.quantity = quantity;
    }
}