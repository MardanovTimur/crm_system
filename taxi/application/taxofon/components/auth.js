import React, {Component} from 'react'
import {TextInput, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux'

export class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.authform}>
                <Text style={styles.header}>
                    Авторизация
                </Text>
                <TextInput style={styles.textinput} placeholder="Ваш телефон" underlineColorAndroid={'transparent'}/>
                <TextInput style={styles.textinput} placeholder="Пароль" secureTextEntry={true}
                           underlineColorAndroid={'transparent'}/>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {
                        Actions.register()
                    }} style={styles.button}>
                        <Text style={styles.btntext}>Регистрация</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btntext}>Войти</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    authform: {
        alignSelf: 'stretch',
        padding: 15,
    },
    header: {
        fontSize: 24,
        color: '#000000',
        textAlign: "center",
        paddingBottom: 5,
        marginBottom: 35,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#000000',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        minWidth : 100,
        height: 45,
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1075c5',
        marginTop: 10,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    }

});

