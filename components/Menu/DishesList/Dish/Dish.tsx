import React from 'react';
import {
    Animated,
    GestureResponderEvent,
    Image, ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import Colors from "../../../../constants/Colors";
import {ImagePicker, LinearGradient, Permissions} from "expo";
import {IDishProps} from "../../../../@types/components/Menu/DishList/Dish/IDishProps";
import {DISH_TAGS} from "../../../../constants/DishTags";
import CheckBox from "react-native-check-box";
import Fonts from "../../../../constants/Fonts";
import CanteenApi from "../../../../utils/CanteenApi";
import DishData from "../../../../dataModels/DishData";

const plusIco = require('../../../../assets/images/plus.png');
const editIco = require('../../../../assets/images/edit_ico_white.png');

interface IFadeInViewProps {
    style ?: Object
}



class FadeInViewAnim extends React.Component<IFadeInViewProps, {}> {
    state = {
        fadeAnim: new Animated.Value(0),
    };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 300,
            }
        ).start();
    }

    render() {
        let { fadeAnim } = this.state;

        return (
            <Animated.View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

interface IDishState {
    isEditing: boolean

    namePL: string;
    nameEN: string;
    descPL: string;
    descEN: string;
    imgUrl: string;
    price: string;
    isPromoted: boolean;
    menuId: number;
    tags: Array<String>;
    currency: string;

    image: Object
}
export default class Dish extends React.Component<IDishProps, IDishState> {

    constructor(props) {
        super(props);

        const dish = this.props.dish;
        this.state = {
            isEditing: false,

            /* editing props */
            namePL: dish.namePL,
            nameEN: dish.nameEN,
            descPL: dish.descPL,
            descEN: dish.descEN,
            imgUrl: dish.imgUrl,
            price: dish.price.toString(),
            isPromoted: dish.isPromoted,
            menuId: dish.menuId,
            tags: dish.tags,
            currency: dish.currency,

            image: null
            /* * * * * * * * */
        };
    }

    render() {
        const buttonType = this.props.editableMode?
            this.state.isEditing?
                <TouchableHighlight onPress={(e: GestureResponderEvent) => this._handleConfirmBtnPress(e)} underlayColor="white">
                    <LinearGradient
                        colors={[Colors.yellow, Colors.orange]}
                        style={[styles.editBtn, styles.flexRow, { borderRadius: 5, alignItems: 'center' }]}>
                        <Image source={editIco} style={styles.btnIco}/>
                        <Text style={styles.orderBtnText}>OK</Text>
                    </LinearGradient>
                </TouchableHighlight>
                :
                <TouchableHighlight onPress={(e: GestureResponderEvent) => this._handleEditBtnPress(e)} underlayColor="white">
                    <LinearGradient
                        colors={[Colors.yellow, Colors.orange]}
                        style={[styles.editBtn, styles.flexRow, { borderRadius: 5, alignItems: 'center' }]}>
                        <Image source={editIco} style={styles.btnIco}/>
                        <Text style={styles.orderBtnText}>Edytuj</Text>
                    </LinearGradient>
                </TouchableHighlight>
            :<TouchableHighlight onPress={(e: GestureResponderEvent) => this._handleOrderBtnPress(e)} underlayColor="white">
                <LinearGradient
                    colors={[Colors.primary, Colors.green]}
                    style={[styles.orderBtn, styles.flexRow]}>
                    <Image source={plusIco} style={styles.btnIco}/>
                    <Text style={styles.orderBtnText}>Zamów</Text>
                </LinearGradient>
            </TouchableHighlight>;

        const boxType = this.state.isEditing?
            <View style={styles.editBox}>
                <View style={styles.leftPart}>
                    <TouchableHighlight style={styles.rightPart} onPress={this._handleAddPhotoPress} underlayColor="white">
                        <View>
                            <Image source={{uri: this.props.dish.imgUrl }|| {uri: ""}} style={styles.img}/>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.rightPart}>
                    <View style={styles.rightUp}>
                        <TextInput style={styles.name}
                                   onChangeText={(namePL) => this.setState({namePL: namePL})}
                                   value={this.props.dish.namePL}/>
                        {buttonType}
                    </View>
                    <View style={styles.rightMiddle}>
                        <TextInput style={styles.desc}
                                   onChangeText={(descPL) => this.setState({descPL: descPL})}
                                   value={this.props.dish.descPL}/>
                        <View style={styles.price}>
                            <TextInput style={styles.biggerNumber}
                                       keyboardType='numeric'
                                       onChangeText={(price) => this.setState({price: price})}
                                       value={this.props.dish.price.toString()}/>
                            <Text style={styles.currency}>zł</Text>
                        </View>
                    </View>
                    <View style={styles.rightBottom}>
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

                                        this.setState({tags: newTags});
                                    } else {
                                        const oldTags = this.state.tags;
                                        const newTags = oldTags.concat(DISH_TAGS.MAIN);

                                        this.setState({tags: newTags});
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
            </View>
            :
            <View style={styles.box}>
                <View style={styles.leftPart}>
                    <Image source={{uri: this.props.dish.imgUrl }|| {uri: ""}} style={styles.img}/>
                </View>
                <View style={styles.rightPart}>
                    <View style={styles.rightUp}>
                        <Text style={styles.name}>{this.props.dish.namePL}</Text>
                        {buttonType}
                    </View>
                    <View style={styles.rightMiddle}>
                        <Text style={styles.desc}>{this.props.dish.descPL}</Text>
                        <View style={styles.price}>
                            <Text style={styles.biggerNumber}>{this.props.dish.price.toString().split(".")[0]}.</Text>
                            <Text style={styles.smallerNumber}>{this.props.dish.price.toString().split(".")[1]}</Text>
                            <Text style={styles.currency}>zł</Text>
                        </View>
                    </View>
                </View>
            </View>;

        return (
            <FadeInViewAnim>
                {boxType}
            </FadeInViewAnim>
        );
    }

    private _handleOrderBtnPress = (e) : void => {
        this.props.addToCart(this.props.dish);
    };

    private _handleEditBtnPress = (e) : void => {
        const {isEditing} = this.state;

        if (!isEditing) {
            this._showEditBox();
        } else {
            this._hideEditBox();
        }
        console.log("click");
    };

    private _handleConfirmBtnPress = (e) : void => {
        console.log('confirmed...');
        const { namePL, nameEN, descPL, descEN, imgUrl, image, price, tags, isPromoted, menuId, currency } = this.state;

        const dish = new DishData(null, namePL, nameEN, descPL, descEN, imgUrl, price, isPromoted, menuId, tags, currency);

        CanteenApi.putDish(dish, (res) => {
           console.log("Got response: ", res);

           if (res.status === "SUCCESS") {
               const data = res.data;

           } else {
               console.warn("Nie udało się wyedytować dania. Spróbuj ponownie");
           }
        });
        this.setState({isEditing: false})
    };

    private _showEditBox = () : void => {
        this.setState({isEditing: true});
    };

    private _hideEditBox = () : void => {
        this.setState({isEditing: false});
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
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    box: {
        height: 85,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginBottom: 10,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    },
    leftPart: {
        width: 110
    },
    rightPart: {
        width: 250,
        paddingTop: 5,
        paddingBottom: 5,
        
        paddingRight: 2
    },
    img: {
        height: 85,
        width: 98,
        borderRadius: 4
    },
    rightUp: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1
    },
    rightMiddle: {
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'space-between'
    },
    inputLabel: {
        fontSize: Fonts.sizes.regular2,
        fontFamily: Fonts.family.montserrat_light
    },
    name: {
        fontSize: 21,
        color: Colors.black,
        fontFamily: 'montserrat-light'
    },
    orderBtn: {
        width: 90,
        height: 35,
        borderRadius: 5,
        alignItems: 'center'
    },
    editBtn: {
        paddingLeft: 10,
        width: 92,
        height: 35,
        borderRadius: 5,
        alignItems: 'center'
    },
    btnIco: {
        width: 20,
        height: 20
    },
    orderBtnText: {
        height: 35,
        width: 86,
        top: 6,

        color: Colors.white,
        backgroundColor: 'transparent',
        fontSize: 17,
        fontFamily: 'montserrat-light'
    },
    desc: {
        width: 170,
        color: Colors.gray
    },
    price: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: "center"
    },
    biggerNumber: {
        fontFamily: 'montserrat-light',
        fontSize: 25,
    },
    smallerNumber: {
        fontFamily: 'montserrat-light',
        fontSize: 14,
        top: 4
    },
    currency: {
        fontFamily: 'montserrat-light',
        fontSize: 25,
    },

    //EDIT MODE
    editBox: {
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginBottom: 10,

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    },
    rightBottom: {

    },
    tagsBox: {

    },
    checkbox: {
        flex: 1
    },

});