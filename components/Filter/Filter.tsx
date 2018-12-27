import React from 'react';
import {
    ScrollView,
    StyleSheet
} from 'react-native';
import Colors from "../../constants/Colors";
import FilterButton from "./FilterButton/FIlterButton";
import { connect } from 'react-redux';
import {DISH_TAGS} from "../../constants/DishTags";
import {addFilter, deleteFilter, dishesRetrieved} from "../../redux/actions/dishesActions";

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

interface IFilterProps {
    addFilter: (String) => void
    deleteFilter: (String) => void
}

class Filter extends React.Component<IFilterProps, {}> {

    state = {
        initialFilter: 'ALL',
        currentFilters: []
    };

    addFilter = (newFilter :String) => {
        this.props.addFilter(newFilter);
    };

    deleteFilter = (filter: String) => {

        this.props.deleteFilter(filter);
    };

    render() {
        return (
            <ScrollView bounces={false} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.container}>
                <FilterButton name={"Zupa"} filterName={DISH_TAGS.SOUP} handleAddFilter={this.addFilter} handleDeleteFilter={this.deleteFilter} icon={SoupICO} iconLighten={SoupLightenICO}/>
                <FilterButton name={"Danie główne"} filterName={DISH_TAGS.MAIN} handleAddFilter={this.addFilter} handleDeleteFilter={this.deleteFilter} icon={PlateICO} iconLighten={PlateLightenICO}/>
                <FilterButton name={"Vege"} filterName={DISH_TAGS.VEGE} handleAddFilter={this.addFilter} handleDeleteFilter={this.deleteFilter} icon={VegeICO} iconLighten={VegeLightenICO}/>
                <FilterButton name={"Napoje"} filterName={DISH_TAGS.BEVERAGE} handleAddFilter={this.addFilter} handleDeleteFilter={this.deleteFilter} icon={DrinkICO} iconLighten={DrinkLightenICO}/>
                <FilterButton name={"Inne"} filterName={DISH_TAGS.OTHER} handleAddFilter={this.addFilter} handleDeleteFilter={this.deleteFilter} icon={AppleICO} iconLighten={AppleLightenICO}/>
            </ScrollView>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFilter: (filter) => dispatch(addFilter(filter)),
        deleteFilter: (filter) => dispatch(deleteFilter(filter))
    }
};
export default connect(null, mapDispatchToProps)(Filter);

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