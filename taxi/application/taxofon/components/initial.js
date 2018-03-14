import React, {Component} from 'react'
import {Button} from "react-native-material-design";
import {Actions} from "react-native-router-flux";
import {View} from "react-native";

export default class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>

                <Button onPress={Actions.register} text={'Регистрация'}/>
            </View>
        )
    }

}