import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ApiFetcher from "../../../utils/ApiFetcher";
import DishData from '../../../dataModels/dishData'
import Dish from "./Dish/Dish";


export default class DishesList extends React.Component {

    state = {
        dishesList: Array<DishData>()
    };

    componentDidMount(){
        ApiFetcher.getAllDishes((data) => {
            if (!data) {
                return;
            }

            console.log(`Here is what to be displayed:`, data);
            this.setState({dishesList: data})
        });
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({item: d }) => {
        console.log('dish:', d);

        return (
            <Dish name={d.namePL}
                  price={d.price}
                  imgUrl={d.imgUrl}
                  desc={d.descPL}/>
        );
    };

    render() {
        if (!this.state.dishesList) {
            return (
                <View>
                    <Text>No menu to display ;(</Text>
                </View>
            );
        } else {
            return (
                <FlatList style={styles.dishesListWrapper}
                    data={this.state.dishesList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    dishesListWrapper: {
        paddingLeft: 5,
        paddingRight: 5
    }
});