import React, {Component} from 'react'
import {Button} from "react-native-material-design";
import {TextInput, View, ScrollView, TouchableOpacity, AsyncStorage, StyleSheet} from "react-native";
import {buttonStyle} from "../styles/buttons";
import {TextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux'
import axios from 'axios'
import {Keyboard} from 'react-native'

export class Register extends Component {

    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.phoneMask = this.phoneMask.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
        this.validate = this.validate.bind(this);
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.sendForm = this.sendForm.bind(this);

        this.nameRef = this.updateRef.bind(this, 'name');
        this.passwordRef = this.updateRef.bind(this, 'password');
        this.phoneRef = this.updateRef.bind(this, 'phone');

        this.state = {
            password: '',
            name: '',
            phone: "",
            error_labels: {
                password: "Должен содержать больше 6 символов",
                name: "Должно содержать больше 2 символов и только русские буквы",
                phone: "Мобильный номер введен не правильно",
            },
            errors: {
                phone: "",
                password: "",
                name: "",
            },
            fields: ['phone', 'name', 'password'],
            secureTextEntry: true,
            phone_mask : [3,4,5,8,9,10,12,13,14,15],
            phone_count: 0,
        };


    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    phoneMask(phone) {
        this.setState({phone})
    };

    validate(field_names = ['phone', 'name', 'password']) {
        let errors = {};
        field_names.forEach((name) => {
            let value = this[name].value();

            if (!value || (name === 'phone' && value.length === 2)) {
                errors[name] = 'Не может быть пустым';
            } else {
                if ('password' === name && value.length < 6) {
                    errors[name] = this.state.error_labels.password
                }
                if ('name' === name && value.length < 2 && !/[А-ЯЁ][а-яё]*/.test(value)) {
                    errors[name] = this.state.error_labels.name
                }
                /*if ('phone' === name && !/\+7\s\([\d]{3}\)\s*[\d]{3}\s[\d]{2}\s[\d]{2}/.test(value)) {
                    errors[name] = this.state.error_labels.phone;
                }*/
            }
        });

        this.setState({errors});
        if (Object.keys(errors).length === 0 && field_names.length === 3) {
            this.sendForm();
        }
    }

    sendForm() {
        let obj = {
            firstName: this.name.value(),
            secondName: "....",
            phoneNumber: this.phone.value(),
            password: this.password.value()
        };
        axios.post('users/add', obj).then((resp) => {
            console.log(resp);
            this.saveKey('token', resp.data);
            this.saveKey('phone', this.phone.value());
            this.saveKey('name', this.name.value());
            console.log('Nice');
            Actions.map();
        }).catch((resp) => {
            let field = resp.response.data.field;
            let object = {};
            object[field] = resp.response.data.message;
            this.setState({"errors": object});
            console.log(this.state.errors);
        })

        Keyboard.dismiss();

    }

    async saveKey(key,value) {
        try {
            await AsyncStorage.setItem('@Store:'+key, value);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }


    onChangeText(text) {
        ['name', 'password', 'phone']
            .map((name) => ({name, ref: this[name]}))
            .forEach(({name, ref}) => {
                if (ref.isFocused()) {
                    this.setState({[name]: text});
                }
            });
    }


    onAccessoryPress() {
        this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
    }

    renderPasswordAccessory() {
        let secureTextEntry = this.state.secureTextEntry;

        let name = secureTextEntry ?
            'visibility' :
            'visibility-off';

        return (
            <MaterialIcon
                size={24}
                name={name}
                color={TextField.defaultProps.baseColor}
                onPress={this.onAccessoryPress}
                suppressHighlighting
            />
        );
    }

    onFocus() {
        let {errors = {}} = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }
        this.setState({errors});
    }

    onSubmitPhone() {
        this.name.focus();
        this.validate(['phone']);
    }

    onSubmitName() {
        this.password.focus();
        this.validate(['name']);
    }

    onSubmitPassword() {
        this.password.blur();
        this.validate(['password']);
    }


    render() {

        return (
            <View style={{flex: 1, margin: 20,}}>
                <View style={{flex: 1, marginTop: 0}}>

                    <TextField label={"Номер телефона"}
                               ref={this.phoneRef}
                               value={this.state.phone}
                               onChangeText={(phone) => {
                                   this.phoneMask(phone)
                               }}
                               keyboardType={'phone-pad'}
                               maxLength={18}
                               onBlur={() => {
                                   this.validate(['phone'])
                               }}
                               onSubmitEditing={this.onSubmitPhone}
                               error={this.state.errors.phone}
                    />

                    <TextField label={"Имя"}
                               ref={this.nameRef}
                               value={this.state.name}
                               onChangeText={this.onChangeText}
                               maxLength={40}
                               onBlur={() => {
                                   this.validate(['name'])
                               }}
                               autoCapitalize={'words'}
                               onSubmitEditing={this.onSubmitName}
                               error={this.state.errors.name}
                    />


                    <TextField
                        ref={this.passwordRef}
                        value={this.state.password}
                        secureTextEntry={this.state.secureTextEntry}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitPassword}
                        returnKeyType='done'
                        label='Пароль'
                        onBlur={() => {
                            this.validate(['password'])
                        }}
                        error={this.state.errors.password}
                        maxLength={20}
                        characterRestriction={20}
                        renderAccessory={this.renderPasswordAccessory}
                    />

                    <View style={{flex: 3, flexDirection: 'row', marginTop: 20}}>
                        <View style={{flex: 1}}/>
                        <View style={{flex: 1.2, height: 100}}>
                            <Button raised={true} text={'Зарегистрироваться'} overrides={buttonStyle()}
                                    onPress={() => {
                                        this.validate()
                                    }}/>
                        </View>
                    </View>
                </View>
                <View>
                    <Button
                        text={'Уже есть учетная запись'}
                        overrides={buttonStyle()}
                        onPress={() => {
                            Actions.initial();
                        }}
                    />
                </View>
            </View>
        );

        let {errors_labels = {}, secureTextEntry, ...data} = this.state;
    }


}


const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        alignItems: "center",
    },

})