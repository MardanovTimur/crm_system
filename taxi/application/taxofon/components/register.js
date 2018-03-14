import React, {Component} from 'react'
import {Button} from "react-native-material-design";
import {TextInput, View} from "react-native";


export class Register extends Component {
    render() {
        return (
            <View>
                <TextInput value={''} placeholder={'Введите номер телефона'}/>
                <Button text={'Зарегестрироваться'}/>
            </View>
        );
    }
}