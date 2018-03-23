import React, {Component} from 'react'
import {Auth} from "./auth";
import {ScrollView, View, StyleSheet, Button} from "react-native";
import {buttonStyle} from "../styles/buttons";
import {Actions} from "react-native-router-flux";

export default class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Auth/>
                <Button onPress={Actions.register} title={'Регистрация'} text={'Регистрация'} overrides={buttonStyle()}/>
            </View>
        );
    }

}
