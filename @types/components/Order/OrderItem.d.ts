import OrderDataItem from "../../../dataModels/OrderDataItem";

interface IOrderItemProps {
    orderItem: OrderDataItem,
    totalPrice: number,
    handleOnDelete: (orderItem: OrderDataItem) => void
}