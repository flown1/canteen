import OrderData from "../../../dataModels/OrderData";

interface IOrderItemProps {
    orderItem: OrderData,
    totalPrice: number,
    handleOnDelete: (id: string) => void
}