import React from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';
import Colors from "../../constants/Colors";
import FilterButton from "./FilterButton/FIlterButton";

const SoupICO = require("../../assets/images/soup_ico.png");
const SoupLightenICO = require("../../assets/images/soup_ico_green.png");
const PlateICO = require("../../assets/images/plate_ico.png");
const PlateLightenICO = require("../../assets/images/plate_ico_green.png");
const VegeICO = require("../../assets/images/veges_ico.png");
const VegeLightenICO = require("../../assets/images/veges_ico_green.png");
const DrinkICO = require('../../assets/images/drink2_ico.png');
const DrinkLightenICO = require('../../assets/images/drink2_ico_green.png');
const AppleICO = require('../../assets/images/apple_ico.png');
const AppleLightenICO = require('../../assets/images/apple_ico_green.png');

export default class Filter extends React.Component {

    render() {
        return (
            <ScrollView bounces={false} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.container}>
                    <FilterButton name={"Zupa"} icon={SoupICO} iconLighten={SoupLightenICO}/>
                    <FilterButton name={"Danie główne"} icon={PlateICO} iconLighten={PlateLightenICO}/>
                    <FilterButton name={"Vege"} icon={VegeICO} iconLighten={VegeLightenICO}/>
                    <FilterButton name={"Napoje"} icon={DrinkICO} iconLighten={DrinkLightenICO}/>
                    <FilterButton name={"Inne"} icon={AppleICO} iconLighten={AppleLightenICO}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginRight: 5,
        marginBottom: 15,
        marginLeft: 5,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,

        //shadow
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.2
    }
});