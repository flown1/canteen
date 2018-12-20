import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import ApiFetcher from "../../../utils/ApiFetcher";
import DishData from '../../../dataModels/dishData'
import Dish from "./Dish/Dish";
import {dishesRetrieved, dishesUpdated} from "../../../redux/actions/dishesActions";
import { IState } from "../../../@types/redux/state/IState";
import { addDishToCart } from "../../../redux/actions/cartActions";
import Colors from "../../../constants/Colors";


interface IDishListProps {
    isMenuLoaded: boolean,
    dishListShow: Array<DishData>,

    onDishesReceived: (dishList: Array<DishData>) => void,
    addToCart: (dish: DishData) => void
}

interface IDishListState {
}

class DishesList extends React.Component<IDishListProps, IDishListState> {

    componentDidMount() {
        ApiFetcher.getAllDishes((data: Array<DishData>) => {
            if (!data) {
                return;
            }

            this.props.onDishesReceived(data);
        });
    }

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item: d }) => {
        return (
            <Dish dish={d}
                  addToCart={this._addToCart}/>
        );
    };

    _addToCart = (dish: DishData) => {
      this.props.addToCart(dish);
    };

    render() {
        if(!this.props.isMenuLoaded){
            console.log("isMenuLoaded: false");
            return (
                <ActivityIndicator size="large" color={Colors.green} />
            )
        } else {

            if (!this.props.dishListShow) {
                return (
                    <View>
                        <Text>Nothing to display ;(</Text>
                    </View>
                );
            } else {
                return (
                    <FlatList style={styles.dishesListWrapper}
                              data={this.props.dishListShow}
                              keyExtractor={this._keyExtractor}
                              renderItem={this._renderItem}
                    />
                );
            }
        }
    }
}

const mapStateToProps = (state: IState) => {
    return {
        isMenuLoaded: state.menu.isLoaded,
        dishListShow: state.menu.dishListShow
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDishesReceived: (dishList) => dispatch(dishesRetrieved(dishList)),
        addToCart: (dish) => dispatch(addDishToCart(dish)),
        filterDishList: (dishList) => dispatch(dishesUpdated(dishList))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DishesList);

const styles = StyleSheet.create({
    dishesListWrapper: {
        paddingLeft: 5,
        paddingRight: 5
    }
});