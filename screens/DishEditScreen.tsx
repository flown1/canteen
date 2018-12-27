import React from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableHighlight,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {DISH_TAGS} from "../constants/DishTags";
import {CheckBox} from "react-native-elements";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import ImgurApi from "../utils/ImgurApi";
import DishData from "../dataModels/DishData";
import CanteenApi from "../utils/CanteenApi";
import {NavigationActions} from "react-navigation";
import {ImagePicker, Permissions} from "expo";
import EditDishButton from "../components/Button/EditDishButton";

const cameraDummyImg = require('../assets/images/camera_add_ico_black.png');

interface IDishEditScreenProps {
    dish: DishData
}

interface IDishEditScreenState {
    name: string;
    desc: string;
    price: string;
    image: Object;
    imgUrl: string;
    isPromoted: boolean;
    tags: Array<String>;

    editingInProgress: boolean;
}

export default class DishEditScreen extends React.Component<IDishEditScreenProps, IDishEditScreenState> {
    constructor(props) {
        super(props);

        const dish = this.props.dish;

        this.state = {
            name: dish.namePL,
            desc: dish.descPL,
            price: dish.price.toString(),
            isPromoted: dish.isPromoted,
            image: null,
            imgUrl: dish.imgUrl,
            tags: dish.tags,

            editingInProgress: false
        }
    }

    render() {
        const loadingOverlay = this.state.editingInProgress ?  <View style={styles.overlay}>
                <ActivityIndicator size={"large"} color={Colors.green}/>
            </View>
            : null;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.main}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Edytuj:</Text>
                        </View>
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
                                           keyboardType='numeric'
                                           onChangeText={(price) => this.setState({price})}
                                           value={this.state.price}/>
                            </View>
                            <TouchableHighlight style={styles.rightPart} onPress={this._handleAddPhotoPress} underlayColor="white">
                                <View>
                                    <Image source={this.state.image || cameraDummyImg} style={styles.cameraImg}/>
                                    <Text style={styles.imageContainerSubtitle}>Kliknij, aby dodać zdjęcie</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.lower}>
                            <View style={styles.row}>
                                <Text style={styles.inputLabel}>Promowane:</Text>
                                <Switch
                                    onValueChange = {val => this.setState({"isPromoted": val})}
                                    value = {this.state.isPromoted}/>
                            </View>
                            <Text style={styles.inputLabel}>Tagi:</Text>
                            <ScrollView style={styles.tagsBox}>
                                <CheckBox
                                    style={styles.checkbox}
                                    isChecked={this.state.tags.indexOf(DISH_TAGS.MAIN) >= 0}
                                    leftText={"Danie główne"}
                                    onClick={() => {
                                        if (this.state.tags.indexOf(DISH_TAGS.MAIN) >= 0) {
                                            const newTags = this.state.tags;
                                            const index = this.state.tags.indexOf(DISH_TAGS.MAIN);
                                            newTags.splice(index, 1);

                                            this.setState({'tags': newTags});
                                        } else {
                                            const oldTags = this.state.tags;
                                            const newTags = oldTags.concat(DISH_TAGS.MAIN);

                                            this.setState({'tags': newTags});
                                        }
                                    }}
                                />
                                <CheckBox
                                    style={styles.checkbox}
                                    isChecked={this.state.tags.indexOf(DISH_TAGS.SOUP) >= 0}
                                    leftText={"Zupa"}
                                    onClick={() => {
                                        if (this.state.tags.indexOf(DISH_TAGS.SOUP) >= 0) {
                                            const newTags = this.state.tags;
                                            const index = this.state.tags.indexOf(DISH_TAGS.SOUP);
                                            newTags.splice(index, 1);

                                            this.setState({'tags': newTags});
                                        } else {
                                            const oldTags = this.state.tags;
                                            const newTags = oldTags.concat(DISH_TAGS.SOUP);

                                            this.setState({'tags': newTags});
                                        }
                                    }}
                                />
                                <CheckBox
                                    style={styles.checkbox}
                                    isChecked={this.state.tags.indexOf(DISH_TAGS.VEGE) >= 0}
                                    leftText={"Vege"}
                                    onClick={() => {
                                        if (this.state.tags.indexOf(DISH_TAGS.VEGE) >= 0) {
                                            const newTags = this.state.tags;
                                            const index = this.state.tags.indexOf(DISH_TAGS.VEGE);
                                            newTags.splice(index, 1);

                                            this.setState({'tags': newTags});
                                        } else {
                                            const oldTags = this.state.tags;
                                            const newTags = oldTags.concat(DISH_TAGS.VEGE);

                                            this.setState({'tags': newTags});
                                        }
                                    }}
                                />
                                <CheckBox
                                    style={styles.checkbox}
                                    isChecked={this.state.tags.indexOf(DISH_TAGS.MEAT) >= 0}
                                    leftText={"Mięsne"}
                                    onClick={() => {
                                        if (this.state.tags.indexOf(DISH_TAGS.MEAT) >= 0) {
                                            const newTags = this.state.tags;
                                            const index = this.state.tags.indexOf(DISH_TAGS.MEAT);
                                            newTags.splice(index, 1);

                                            this.setState({'tags': newTags});
                                        } else {
                                            const oldTags = this.state.tags;
                                            const newTags = oldTags.concat(DISH_TAGS.MEAT);

                                            this.setState({'tags': newTags});
                                        }
                                    }}
                                />
                                <CheckBox
                                    style={styles.checkbox}
                                    isChecked={this.state.tags.indexOf(DISH_TAGS.BEVERAGE) >= 0}
                                    leftText={"Napoje"}
                                    onClick={() => {
                                        if (this.state.tags.indexOf(DISH_TAGS.BEVERAGE) >= 0) {
                                            const newTags = this.state.tags;
                                            const index = this.state.tags.indexOf(DISH_TAGS.BEVERAGE);
                                            newTags.splice(index, 1);

                                            this.setState({'tags': newTags});
                                        } else {
                                            const oldTags = this.state.tags;
                                            const newTags = oldTags.concat(DISH_TAGS.BEVERAGE);

                                            this.setState({'tags': newTags});
                                        }
                                    }}
                                />
                                <CheckBox
                                    style={styles.checkbox}
                                    isChecked={this.state.tags.indexOf(DISH_TAGS.OTHER) >= 0}
                                    leftText={"Inne"}
                                    onClick={() => {
                                        if (this.state.tags.indexOf(DISH_TAGS.OTHER) >= 0) {
                                            const newTags = this.state.tags;
                                            const index = this.state.tags.indexOf(DISH_TAGS.OTHER);
                                            newTags.splice(index, 1);

                                            this.setState({'tags': newTags});
                                        } else {
                                            const oldTags = this.state.tags;
                                            const newTags = oldTags.concat(DISH_TAGS.OTHER);

                                            this.setState({'tags': newTags});
                                        }
                                    }}
                                />
                            </ScrollView>

                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <EditDishButton onPress={this._handleOnEditDishPress}/>
                    </View>
                    {loadingOverlay}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    private _showOverlay = (): void => {
        this.setState({'editingInProgress': true});
    };

    private _hideOverlay = (): void => {
        this.setState({'editingInProgress': false});
    };

    private _handleOnEditDishPress = (): void => {
        const image = this.state.image;
        const name = this.state.name;

        if (!this._validateInputs) {
            console.warn("Ups! Podano nieprawidłowe dane.");
            return ;
        }
        this._showOverlay();

        ImgurApi.postImage(image, name, (res) => {
            console.log("Res from Imgur:", res);

            if (res.status === 200) {
                const data = res.data;
                const imgLink = data.link;

                const dish = new DishData(null, this.state.name, "", this.state.desc, "",
                    imgLink, this.state.price, this.state.isPromoted, 1, this.state.tags, "PLN");

                CanteenApi.postDish(dish, (res) => {
                    console.log("Response from canteen Api: ", res);
                    if (res.status === "SUCCESS") {
                        console.log("[OK] Dish had been added");

                        // this.props.navigation.dispatch(NavigationActions.back({key: 'Menu'}));
                    } else {
                        console.warn("[ERR] Something went wrong. The dish was NOT added :(");
                    }
                    this._hideOverlay();
                })
            }
        });
    };

    private _validateInputs = (): boolean => {
        if (this.state.name === "") return false;
        if (this.state.desc === "") return false;

        const price = this.state.price;
        if (price === "" || price === "0.00" || price === "0" || price === "0.0") return false;
        if (this.state.image === null) return false;

        return true;
    };

    private _handleAddPhotoPress = async (): Promise<void> => {

        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                // allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                // @ts-ignore
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });

            if (!result.cancelled) {
                this.setState({image: result});
            } else {
                // this.setState({image: null});
            }
        } else {
            console.warn("Permission not granted! Cannot load a photo");
            this.setState({image: null})
        }
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
    overlay: {
        position: 'absolute',
        backgroundColor:  'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    },
    header: {
        borderBottomColor: Colors.black,
        borderBottomWidth: 1
    },
    headerText: {
        fontSize: Fonts.sizes.big,
        fontFamily: Fonts.family.montserrat_light
    },
    main: {
    },
    upper: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'center',
    },
    lower: {

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
    tagsBox: {
        height: 150
    },
    checkbox: {
        flex: 1
    },
    cameraImg: {
        height: 160,
        width: 160
    },
    imageContainerSubtitle: {
        textAlign: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',

        marginLeft: 10,
        marginRight: 10
    },
    bottom: {

    }
});