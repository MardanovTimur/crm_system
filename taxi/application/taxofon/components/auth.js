import React, {Component} from 'react'
import {Button} from "react-native-material-design";
import {TextInput, View} from "react-native";
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

    render() {
        return (
            <View style={{
                flex : 1,
                margin: 20,
            }}>
                <View style={{flex: 1, marginTop:100}}>
                    <PhoneInput
                        ref={(ref) => { this.phone = ref; }} initialCountry={'ru'} textStyle={phoneStyle()}
                        textProps={phonePlaceHolder()}
                    />
                    <PasswordInputText
                        value={this.state.password}
                        onChangeText={ (password) => this.setState({ password })
                        }
                    />
                    <View style={{margin:7}} />
                    <Button text={'Войти'} overrides={buttonStyle()}/>

                </View>
            </View>
        );
    }
}