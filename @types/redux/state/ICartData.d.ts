import OrderDataItem from "../../../dataModels/OrderDataItem";

export interface ICartState {
    items: Array<OrderDataItem>
    total: number
}