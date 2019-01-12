import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OrderData from "../../../dataModels/OrderData";
import Colors from "../../../constants/Colors";
import OrderCodeCircle from "../../OrderCodeCircle/OrderCodeCircle";
import ReadyButton from "../../Button/ReadyButton";
import OrderDataItem from "../../../dataModels/OrderDataItem";
import Fonts from "../../../constants/Fonts";
import CanteenApi from "../../../utils/CanteenApi";
import PickupButton from "../../Button/PickupButton";
import CompleteButton from "../../Button/CompleteButton";

interface IOrderListItemProps {
    order: OrderData
    onDestroy: (order: OrderData) => void
}
interface IOrderListItemState {
    mode: string
}

export default class OrderListItem extends React.Component<IOrderListItemProps, IOrderListItemState> {
    private MODES = {
        PAID: "PAID",
        READY: "READY",
        COMPLETE: "COMPLETE"
    };

    constructor(props) {
        super(props);

        const { status } = this.props.order;
        this.state = {
            mode: status
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
        const MODES = this.MODES;
        const mode = this.state.mode;

        switch (mode) {
            case MODES.PAID:
                button = <ReadyButton onPress={this._handleOnReadyPress}/>;
                break;
            case MODES.READY:
                button = <PickupButton onPress={this._handleOnPickupPress}/>;
                break;
            case MODES.COMPLETE:
                button = <CompleteButton/>;
                break;
            default:
                console.warn("Trying to set button as: ", status);
                break;
        }

        return (
            <View style={styles.box}>
                <View style={[styles.upperPart, styles.flexRow]}>
                    <View style={styles.upperLeftPart}>
                        <OrderCodeCircle size={"SMALL"} code={code || "----"}/>
                    </View>
                    <View style={styles.upperRightPart}>
                        <Text style={styles.date}>{date !== null ? date.split("+")[0] : "---"}</Text>
                        {button}
                    </View>
                </View>
                <View style={[styles.bottomPart]}>
                    <View style={styles.itemsListWrapper}>
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
        const order = this.props.order;
        const id = order.id;

        CanteenApi.setOrderReady(id,(res) => {
            if (res.status) {
                console.log("SUCCESSfuly changed status!");
                this.setState({mode: "READY"});
            } else {
                console.log("ERROR while changing status!");
            }
        })
    };

    _handleOnPickupPress = () => {
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

    _setMode = (mode: string) => {
        const MODES = this.MODES;
        switch(mode) {
            case MODES.COMPLETE:
                this.setState({mode: MODES.COMPLETE});
                break;
            case MODES.PAID:
                this.setState({mode: MODES.PAID});
                break;
            case MODES.READY:
                this.setState({mode: MODES.READY});
                break;
            default:
                break;
        }
    };

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
    itemsListWrapper: {

    },
    dishListItem: {
        marginLeft: 20,
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