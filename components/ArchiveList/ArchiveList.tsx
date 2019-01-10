import React from 'react';
import {
    FlatList,
    StyleSheet, Text
} from 'react-native';
import OrderData from "../../dataModels/OrderData";
import Loader from "../Loader/Loader";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import ArchiveListItem from "./ArchiveListItem/ArchiveListItem";

interface IArchiveListProps {
    isLoaded: boolean
    orders: Array<OrderData>
}

export default class ArchiveList extends React.Component<IArchiveListProps> {

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item: o }) => {
        return (
            <ArchiveListItem order={o}/>
        );
    };

    render() {
        const orders = this.props.orders;

        if(!this.props.isLoaded){
            return (
                <Loader/>
            )
        } else {
            return(
                <>
                    <Text style={styles.title}>Archiwum:</Text>
                    <Text style={styles.note}>Pociągnij w dół, aby odświeżyć...</Text>
                    <FlatList style={styles.orderListWrapper}
                              data={orders}
                              keyExtractor={this._keyExtractor}
                              renderItem={this._renderItem}
                    />
                </>
            );
        }
    }
}


const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.big,
        color: Colors.black,
        marginLeft: 5,
        marginTop: 8,
        marginBottom: 8
    },
    orderListWrapper: {
        paddingLeft: 5,
        paddingRight: 5
    },
    note: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.small,
        color: Colors.darkGray
    }
});