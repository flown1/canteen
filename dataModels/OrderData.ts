import DishData from "./DishData";

export default class OrderData {
    private _dish: DishData;
    private _quantity: number;

    constructor(dish: DishData, quantity: number) {
        this._dish = dish;
        this._quantity = quantity;
    }

    get quantity(): number {
        return this._quantity;
    }
    set quantity(value: number) {
        this._quantity = value;
    }

    get dish(): DishData {
        return this._dish;
    }

    set dish(value: DishData) {
        this._dish = value;
    }

}