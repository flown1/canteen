import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OrderData from "../../../dataModels/OrderData";
import Colors from "../../../constants/Colors";
import OrderCodeCircle from "../../OrderCodeCircle/OrderCodeCircle";
import ReadyButton from "../../Button/ReadyButton";
import OrderDataItem from "../../../dataModels/OrderDataItem";
import Fonts from "../../../constants/Fonts";
import CanteenApi from "../../../utils/CanteenApi";
import {ORDER_STATUS} from "../../../constants/OrderStatus";
import PickupButton from "../../Button/PickupButton";

interface IOrderListItemProps {
    order: OrderData
    onDestroy: (order: OrderData) => void
}

export default class OrderListItem extends React.Component<IOrderListItemProps, {}> {
    private MODES = {
        PAID: "PAID",
        READY: "READY",
        COMPLETE: "COMPLETE"
    };

    constructor(props) {
        super(props);

        const orderItem = this.props.order;
        this.state = {
            mode: orderItem.status
        }
    }

    render() {
        const order = this.props.order;
        const {items, date, status, code} = order;

        const orderItemsList = items.map((i: OrderDataItem, idx: number) => {
            return (
                <Text style={styles.dishListItem} key={idx}>{i.quantity} x {i.dish.namePL}</Text>
            )
        });

        let button = null;
        switch (status) {
            case ORDER_STATUS.PAID:
                button = <ReadyButton onPress={this._handleOnReadyPress}/>;
                break;
            case ORDER_STATUS.READY:
                button = <PickupButton onPress={this._handleOnPickupPress}/>;
                break;
            case ORDER_STATUS.COMPLETED:
                button = null;
                break;
            default:
                console.warn("Trying to set button the wrong way!!");
        }

        return (
            <View style={styles.box}>
                <View style={[styles.upperPart, styles.flexRow]}>
                    <View style={styles.upperLeftPart}>
                        <OrderCodeCircle size={"SMALL"} code={code || "----"}/>
                    </View>
                    <View style={styles.upperRightPart}>
                        <Text style={styles.date}>{date.split("+")[0] || "---"}</Text>
                        {button}
                    </View>
                </View>
                <View style={[styles.bottomPart]}>
                    <View style={styles.itemsList}>
                        {orderItemsList}
                    </View>
                    <View style={[styles.costRow,styles.flexRow]}>
                        <Text style={styles.costLabel}>Koszt:</Text>
                        <Text style={styles.price}>{order.price} zł</Text>
                    </View>
                </View>
            </View>
        );
    }

    _handleOnReadyPress = () => {
        console.log("Ready button pressed...");
        const order = this.props.order;
        const id = order.id;

        CanteenApi.setOrderReady(id,(res) => {
            if (res.status) {
                console.log("SUCCESSfuly changed status!");
                this._setMode(this.MODES.READY);
            } else {
                console.log("ERROR while changing status!");
            }
        })
    };

    _handleOnPickupPress = () => {
        console.log("Pickup button pressed...");
        const order = this.props.order;
        const id = order.id;

        CanteenApi.setOrderComplete(id,(res) => {
            if (res.status) {
                console.log("SUCCESSfuly changed status!");
                this._setMode(this.MODES.COMPLETE);
                this._selfDestruction();
            } else {
                console.log("ERROR while changing status!");
            }
        })
    };

    _setMode(mode: string) {
        const MODES = this.MODES;
        switch(mode) {
            case MODES.COMPLETE:
                this.setState({modes: MODES.COMPLETE});
                break;
            case MODES.PAID:
                this.setState({modes: MODES.PAID});
                break;
            case MODES.READY:
                this.setState({modes: MODES.READY});
                break;
            default:
                console.warn("Trying to set wrong mode in button");
                break;
        }
    }

    _selfDestruction = () => {
        const order = this.props.order;
        this.props.onDestroy(order);
    }
}

const styles = StyleSheet.create({
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    box: {
        minHeight: 100,
        borderRadius: 4,
        backgroundColor: Colors.white,

        marginBottom: 10,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 6,
        paddingRight: 6,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    },
    upperPart: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        justifyContent: 'space-between'
    },
    upperLeftPart: {

    },
    upperRightPart: {

    },
    bottomPart: {

    },
    date: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.small,
        textAlign: 'right'
    },
    itemsList: {

    },
    dishListItem: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular1,
    },
    costRow: {
        justifyContent: 'space-between'
    },
    costLabel: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular2,
    },
    price: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular2,
    }
});