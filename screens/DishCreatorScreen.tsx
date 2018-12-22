import React from 'react';
import {
    Image,
    GestureResponderEvent,
    StyleSheet,
    Text, TextInput,
    View, TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux'
import AddDishButton from "../components/Button/AddDishButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

const cameraDummyImg = require('../assets/images/camera_add_ico_black.png');

export default class DishCreatorScreen extends React.Component<{},{}> {
    state = {
        name: "",
        desc: "",
        price: 0.00
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Dodaj:</Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.upper}>
                        <View style={styles.leftPart}>
                            <Text style={styles.inputLabel}>Nazwa:</Text>
                            <TextInput style={styles.textInput}
                                       onChangeText={(name) => this.setState({name})}
                                       value={this.state.name}/>
                            <Text style={styles.inputLabel}>Opis:</Text>
                            <TextInput style={styles.textInput}
                                        onChangeText={(desc) => this.setState({desc})}
                                       value={this.state.desc}/>
                            <Text style={styles.inputLabel}>Cena:</Text>
                            <TextInput style={styles.textInput}
                                       dataDetectorTypes={"phoneNumber"}
                                       onChangeText={(price) => this.setState({price})}
                                       value={this.state.desc}/>
                        </View>
                        <TouchableHighlight style={styles.rightPart} onPress={this._handleAddPhotoPress} underlayColor="white">
                            <View>
                                <Image source={cameraDummyImg} style={styles.cameraImg}/>
                                <Text style={styles.imageContainerSubtitle}>Kliknij, aby dodać zdjęcie</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.lower}>

                    </View>
                </View>
                <View style={styles.bottom}>
                    <AddDishButton onPress={this._handleOnAddDishPress}/>
                </View>
            </View>
        );
    }

    private _handleOnAddDishPress = (e: GestureResponderEvent): void => {
        e.preventDefault();

    };

    private _handleAddPhotoPress = (e: GestureResponderEvent): void => {
        e.preventDefault();

        console.log("Willing to add photo...");
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 30,
        marginRight: 8,
        marginLeft: 8
    },
    header: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 1
    },
    headerText: {
        fontSize: Fonts.sizes.big,
        fontFamily: Fonts.family.montserrat_light
    },
    upper: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'center',
        minHeight: 400
    },
    leftPart: {
        alignSelf: 'stretch',
    },
    rightPart: {
        alignSelf: 'stretch',
        height: 180,
        backgroundColor: Colors.gray,
        borderLeftColor: Colors.black,
        borderLeftWidth: 1,
        marginLeft: 8,
        marginRight: 8,
    },
    inputLabel: {
        width: 80,
        fontSize: Fonts.sizes.regular2,
        fontFamily: Fonts.family.montserrat_light
    },
    textInput: {
        width: 200,
        height: 30,
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        marginBottom: 15
    },
    cameraImg: {
        height: 160,
        width: 160
    },
    imageContainerSubtitle: {
        textAlign: 'center'
    }
});