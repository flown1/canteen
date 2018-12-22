import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView
} from "react-native";
import IMenuScreenProps from "../@types/screens/MenuScreen/IMenuScreenProps";
import DishesList from "../components/Menu/DishesList/DishesList";
import Colors from "../constants/Colors";
import Filter from "../components/Filter/Filter";
import { connect } from 'react-redux';
import {IState} from "../@types/redux/state/IState";
import AddDishButton from "../components/Button/AddDishButton";
import { USER_ROLES } from "../constants/UserRoles";

class MenuScreen extends React.Component<IMenuScreenProps> {

    private _handleOnAddDishPress = (): void => {
        this.props.navigation.navigate('DishCreator')
    };

    render() {
        const user = this.props.user;

        const addDishButton = user.role === USER_ROLES.ADMIN?
            <AddDishButton onPress={this._handleOnAddDishPress}/>
            : null;

        return (
            <ScrollView style={styles.container}>
                <Filter/>
                <Text style={styles.sectionLabel}>Menu na dzis:</Text>
                {addDishButton}
                <DishesList/>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        user: state.signIn.user
    }
};
export default connect(mapStateToProps)(MenuScreen);
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

