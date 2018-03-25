import React, {Component} from 'react'
import {Button} from "react-native-material-design";
import {TextInput, View, ScrollView, TouchableOpacity, AsyncStorage} from "react-native";
import {buttonStyle} from "../styles/buttons";
import {TextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux'

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
        this.nameRef = this.updateRef.bind(this, 'name');
        this.passwordRef = this.updateRef.bind(this, 'password');
        this.phoneRef = this.updateRef.bind(this, 'phone');

        this.state = {
            password: '',
            name: '',
            phone: '+7',
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
        };


    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    phoneMask(phone) {
        if ((phone.length < 18 && this.state.phone.length < phone.length)) {
            switch (phone.length) {
                case 3:
                case 4: {
                    phone = phone.slice(0, 2) + " (" + phone.slice(-1);
                    break;
                }
                case 8:
                case 9: {
                    phone = phone.slice(0, 7) + ") " + phone.slice(-1);
                    break;
                }
                case 13:
                case 14 : {
                    phone = phone.slice(0, 12) + " " + phone.slice(-1);
                    break;
                }
                case 16:
                case 17 : {
                    phone = phone.slice(0, 15) + " " + phone.slice(-1);
                    break;
                }
                case 1:
                case 2: {
                    phone = "+7";
                    break;
                }
            }
            this.setState({phone});
        } else {
            this.setState({phone});
        }
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
                if ('phone' === name && !/\+7\s\([\d]{3}\)\s*[\d]{3}\s[\d]{2}\s[\d]{2}/.test(value)) {
                    errors[name] = this.state.error_labels.phone;
                }
            }
        });

        this.setState({errors});
        if (Object.keys(errors).length === 0 && field_names.length === 3) {
            console.log(this.phone.value());
            this.sendForm();
            AsyncStorage.setItem('@TokenStore:token', 'token');
            AsyncStorage.setItem('phone', this.phone.value());
            AsyncStorage.setItem('name', this.name.value());
            Actions.map();
        }
    }

    sendForm() {

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

                    <TextField label={"Номер вашего телефона"}
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

                    <TextField label={"Ваше имя"}
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
                        maxLength={30}
                        characterRestriction={20}
                        renderAccessory={this.renderPasswordAccessory}
                    />

                    <View style={{flex: 3, flexDirection: 'row'}}>
                        <View style={{flex: 1}}/>
                        <View style={{flex: 2, height:100}}>
                            <Button raised={true} text={'Зарегистрироваться'} overrides={buttonStyle()}
                                    onPress={() => {
                                        this.validate()
                                    }}/>
                        </View>
                    </View>
                </View>
            </View>
        );

        let {errors_labels = {}, secureTextEntry, ...data} = this.state;
    }


}