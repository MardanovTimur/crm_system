import React, {Component} from 'react'
import {Button} from "react-native-material-design";
import {TextInput, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {buttonStyle} from "../styles/buttons";
import PhoneInput from "react-native-phone-input";
import {countriesList, phonePlaceHolder, phoneStyle} from "../styles/text";
import PasswordInputText from 'react-native-hide-show-password-input';


export class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password : '',
        }
    }

    render () {
        return (
            <View style = {styles.authform}>
                <Text style = {styles.header}>
                    Авторизация
                </Text>
                <TextInput style = {styles.textinput} placeholder="Ваш телефон" underlineColorAndroid ={'transparent'}/>
                <TextInput style = {styles.textinput} placeholder="Пароль" secureTextEntry = {true} underlineColorAndroid ={'transparent'}/>
                <TouchableOpacity style = {styles.button}>
                    <Text style = {styles.btntext}>Войти</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
   authform : {
        alignSelf: 'stretch',
   },
   header: {
        fontSize: 24,
        color: '#fff',
        paddingLeft: 45,
        paddingBottom: 5,
        marginBottom: 35,
   },
    textinput: {
       alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button : {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    }

});

