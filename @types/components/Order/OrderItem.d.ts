import OrderDataItem from "../../../dataModels/OrderDataItem";

interface IOrderItemProps {
    orderItem: OrderDataItem,
    totalPrice: number,
    handleOnDelete: (id: string) => void
}