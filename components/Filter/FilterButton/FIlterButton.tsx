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
    filterName : string
    handleAddFilter: (filterName : string) => void
    handleDeleteFilter: (filterName : string) => void
}

interface IFilterButtonState {
    isLightenUp: boolean
}

export default class FilterButton extends React.Component<IFilterButtonProps, IFilterButtonState> {
    state = {
        isLightenUp: false
    };

    _handleOnPress = () => {
        this.setState({isLightenUp: !this.state.isLightenUp});

        if (this.state.isLightenUp) {
            this.props.handleDeleteFilter(this.props.filterName);
        } else {
            this.props.handleAddFilter(this.props.filterName);
        }
    };

    render() {
        return (
            <TouchableOpacity onPress={this._handleOnPress}>
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