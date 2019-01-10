import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import OrderData from "../../../dataModels/OrderData";
import Colors from "../../../constants/Colors";
import OrderCodeCircle from "../../OrderCodeCircle/OrderCodeCircle";
import OrderDataItem from "../../../dataModels/OrderDataItem";
import Fonts from "../../../constants/Fonts";
import Translator from "../../../utils/Translator";

interface IUserOrderListItemProps {
    order: OrderData
}
interface IUserOrderListItemState {
    mode: string
}

export default class UserOrderListItem extends React.Component<IUserOrderListItemProps, IUserOrderListItemState> {

    constructor(props) {
        super(props);

        const orderItem = this.props.order;
        this.state = {
            mode: orderItem.status
        }
    }

    render() {
        const order = this.props.order;
        const {items, status, code} = order;

        const orderItemsList = items.map((i: OrderDataItem, idx: number) => {
            return (
                <Text style={styles.dishListItem} key={idx}>{i.quantity} x {i.dish.namePL}</Text>
            )
        });

        return (
            <View style={styles.box}>
                <View style={styles.upperPart}>
                    <OrderCodeCircle size={"LARGE"} code={code || "----"}/>
                    <Text style={styles.statusLabel}>Status zamówienia:</Text>
                    <Text style={styles.status}>{Translator.engToPol(status)}</Text>
                </View>
                <View style={[styles.bottomPart]}>
                    <View style={styles.itemsListWrapper}>
                        {orderItemsList}
                    </View>
                </View>
            </View>
        );
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
        borderBottomColor: Colors.darkGray,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upperLeftPart: {

    },
    upperRightPart: {

    },
    bottomPart: {

    },
    statusLabel: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular1
    },
    status: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular2,
        color: Colors.green
    },
    itemsListWrapper: {

    },
    dishListItem: {
        marginLeft: 20,
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular1,
        color: Colors.darkGray
    },
    costRow: {
        justifyContent: 'space-between'
    },
    costLabel: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.regular2,
    }
});