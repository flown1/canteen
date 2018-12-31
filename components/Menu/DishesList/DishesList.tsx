import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import CanteenApi from "../../../utils/CanteenApi";
import DishData from '../../../dataModels/DishData'
import Dish from "./Dish/Dish";
import { dishesRetrieved } from "../../../redux/actions/dishesActions";
import { IState } from "../../../@types/redux/state/IState";
import { addDishToCart } from "../../../redux/actions/cartActions";
import Colors from "../../../constants/Colors";
import { USER_ROLES } from "../../../constants/UserRoles";
import IReactNavigateProps from "../../../@types/@react-navigation/IReactNavigateProps";
import Loader from "../../Loader/Loader";


interface IDishListProps {
    isMenuLoaded: boolean,
    dishListShow: Array<DishData>,
    isEditableMode: boolean,
    navigation: IReactNavigateProps

    onDishesReceived: (dishList: Array<DishData>) => void,
    addToCart: (dish: DishData) => void
}

interface IDishListState {
}

class DishesList extends React.Component<IDishListProps, IDishListState> {

    componentDidMount() {
        this.fetchDishes();
    }

    fetchDishes = () => {
        CanteenApi.getAllDishes((data: Array<DishData>) => {
            if (!data) {
                return;
            }
            this.setState({isRefreshing: false});
            this.props.onDishesReceived(data);
        });
    };

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({item: d }) => {
        return (
            <Dish dish={d}
                  editableMode={this.props.isEditableMode}
                  addToCart={this._addToCart}
                  navigation={this.props.navigation}/>
        );
    };

    _addToCart = (dish: DishData) => {
      this.props.addToCart(dish);
    };

    render() {
        if(!this.props.isMenuLoaded){
            return (
                <Loader/>

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
        dishListShow: state.menu.dishListShow,
        isEditableMode: state.signIn.user.role === USER_ROLES.ADMIN
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDishesReceived: (dishList) => dispatch(dishesRetrieved(dishList)),
        addToCart: (dish) => dispatch(addDishToCart(dish))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DishesList);

const styles = StyleSheet.create({
    dishesListWrapper: {
        paddingLeft: 5,
        paddingRight: 5
    }
});