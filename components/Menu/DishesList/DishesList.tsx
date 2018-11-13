import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import ApiFetcher from "../../../utils/ApiFetcher";
import DishData from '../../../dataModels/dishData'
import Dish from "./Dish/Dish";
import {dishAddToCart, dishesRetrieved} from "../../../redux/actions/dishesActions";
import {IState} from "../../../@types/redux/state/IState";


interface IDishListProps {
    dishList: Array<DishData>,

    onDishesReceived: (dishList: Array<DishData>) => void,
    addToCart: (dish: DishData) => void
}

class DishesList extends React.Component<IDishListProps> {
    componentDidMount(){
        console.log("Triggering apiFetcher");
        ApiFetcher.getAllDishes((data: Array<DishData>) => {
            if (!data) {
                return;
            }

            console.log(`Here is what to be displayed:`, data);
            this.props.onDishesReceived(data);

        });
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item: d }) => {
        console.log('dish:', d);
        return (
            <Dish dish={d}
                  addToCart={this._addToCart}/>
        );
    };

    _addToCart = (dish: DishData) => {
      console.log(`DishList will add product of name${dish.namePL}`);
      this.props.addToCart(dish);
    };
    render() {
        if (!this.props.dishList) {
            return (
                <View>
                    <Text>No menu to display ;(</Text>
                </View>
            );
        } else {
            return (
                <FlatList style={styles.dishesListWrapper}
                    data={this.props.dishList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            );
        }
    }
}

const mapStateToProps = (state: IState) => {
    console.log("STATE: ", state);
    return {
        dishList: state.menu.dishList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDishesReceived: (dishList) => dispatch(dishesRetrieved(dishList)),
        addToCart: (dish) => dispatch(dishAddToCart(dish))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DishesList);

const styles = StyleSheet.create({
    dishesListWrapper: {
        paddingLeft: 5,
        paddingRight: 5
    }
});