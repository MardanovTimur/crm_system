import React, {Component} from 'react'
import {Button} from "react-native-material-design";
import {Actions} from "react-native-router-flux";
import {View, StyleSheet} from "react-native";
import {buttonStyle} from "../styles/buttons";
import {Auth} from "./auth";

export default class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Auth/>
                <Button onPress={Actions.register} text={'Регистрация'} overrides={buttonStyle()}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
        paddingLeft:60,
        paddingRight:60,
    }
});