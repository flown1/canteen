import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView, RefreshControl
} from "react-native";
import IMenuScreenProps from "../@types/screens/MenuScreen/IMenuScreenProps";
import DishesList from "../components/Menu/DishesList/DishesList";
import Colors from "../constants/Colors";
import Filter from "../components/Filter/Filter";
import { connect } from 'react-redux';
import {IState} from "../@types/redux/state/IState";
import AddDishButton from "../components/Button/AddDishButton";
import { USER_ROLES } from "../constants/UserRoles";
import {dishesRetrieved} from "../redux/actions/dishesActions";
import CanteenApi from "../utils/CanteenApi";

class MenuScreen extends React.Component<IMenuScreenProps> {
    state = {
        isRefreshing: false
    };

    _handleOnAddDishPress = (): void => {
        this.props.navigation.navigate('DishCreator')
    };

    _onRefresh = () => {
        console.log("Refreshing...");
        this.setState({isRefreshing: true});

        CanteenApi.getAllDishes((data) => {
            this.props.onDishesReceived(data);
            this.setState({isRefreshing: false});
        });
    };

    render() {
        const user = this.props.user;

        const addDishButton = user.role === USER_ROLES.ADMIN?
            <AddDishButton onPress={this._handleOnAddDishPress}/>
            : null;

        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
            >
                <Filter/>
                <Text style={styles.sectionLabel}>Menu na dzis:</Text>
                {addDishButton}
                <DishesList navigation={this.props.navigation}/>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        user: state.signIn.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDishesReceived: (dishList) => dispatch(dishesRetrieved(dishList)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor
    },
    sectionLabel: {
        fontFamily: 'montserrat-light',
        fontSize: 22,
        color: Colors.black
    }
});

