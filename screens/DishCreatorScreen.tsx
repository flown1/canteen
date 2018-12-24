import React from 'react';
import {
    Image,
    GestureResponderEvent,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';
import { connect } from 'react-redux'
import AddDishButton from "../components/Button/AddDishButton";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import {DISH_TAGS} from "../constants/DishTags";
import CheckBox from "react-native-check-box";
import {ImagePicker, Permissions} from "expo";
import ImageResult = ImagePicker.ImageResult;

const cameraDummyImg = require('../assets/images/camera_add_ico_black.png');

interface IDishCreatorScreenState {
    name: string;
    desc: string;
    price: number;
    image: ImageResult;
    isPromoted: boolean;
    tags: Array<string>;
}

export default class DishCreatorScreen extends React.Component<{},IDishCreatorScreenState> {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            desc: "",
            price: 0.00,
            isPromoted: false,
            image: null,
            tags: []
        };
    }

    componentDidUpdate() {
        console.log(this.state);
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.main}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Dodaj:</Text>
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
                                       dataDetectorTypes={"phoneNumber"}
                                       onChangeText={(price) => this.setState({price})}
                                       value={this.state.desc}/>
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
                                leftText={"Other"}
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
                    <AddDishButton onPress={this._handleOnAddDishPress}/>
                </View>
            </View>
        );
    }

    private _handleOnAddDishPress = (e: GestureResponderEvent): void => {
        e.preventDefault();

    };


    private _handleAddPhotoPress = async (e: GestureResponderEvent): void => {
        e.preventDefault();

        console.log("Willing to add photo...");

        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
                // @ts-ignore
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });

            if (!result.cancelled) {
                this.setState({image: result});
            } else {
                this.setState({image: null});
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