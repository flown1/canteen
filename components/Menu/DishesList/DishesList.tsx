import React from 'react';
import {
    View
} from 'react-native';
import Dish from "./Dish/Dish";

export default class DishesList extends React.Component {

    render() {
        return (
            <View>
                <Dish name={'Schabik'}
                    price={12.99}
                    imgUrl={'https://static.smaker.pl/photos/6/3/4/634320b0d13462d3176f0896942fa7f0_110705_57b32fe3190aa_wm.jpg'}
                    desc={'Pyszny schabowy!!!! Mmmm...'}/>
            </View>
        );
    }
}