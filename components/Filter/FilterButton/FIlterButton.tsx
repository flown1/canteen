import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Colors from "../../../constants/Colors";
import Fonts from "../../../constants/Fonts";

interface IFilterButtonProps {
    name ?: string,
    icon ?: ImageSourcePropType,
    iconLighten ?: ImageSourcePropType
}

interface IFilterButtonState {
    isLightenUp: boolean
}

export default class FilterButton extends React.Component<IFilterButtonProps, IFilterButtonState> {
    state = {
        isLightenUp: false
    };
    render() {
        return (
            <TouchableOpacity onPress={() => {this.setState({isLightenUp: !this.state.isLightenUp})}}>
                <View style={styles.container}>
                    <Image style={styles.img} source={this.state.isLightenUp? (this.props.iconLighten || null) : (this.props.icon || null)}/>
                    <Text style={styles.title}>{this.props.name || ""}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 70,
        justifyContent: 'center',
        borderRightColor: Colors.black,
        borderRightWidth: 1
    },
    img: {
        width: 50,
        height: 50
    },
    title: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.tiny
    }
});