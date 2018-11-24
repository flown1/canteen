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
    icon ?: ImageSourcePropType | null,
    iconLighten ?: ImageSourcePropType | null
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
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: Colors.black,
        borderRightWidth: 1,
        paddingTop: 3,
        paddingRight: 3,
        paddingBottom: 3,
        paddingLeft: 3
    },
    img: {
        width: 45,
        height: 45
    },
    title: {
        fontFamily: Fonts.family.montserrat_light,
        fontSize: Fonts.sizes.tiny
    }
});