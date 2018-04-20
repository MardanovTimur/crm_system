import React, {Component} from 'react'
import {
    TextInput, View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ListView,
    ScrollView, AsyncStorage, Keyboard
} from "react-native";
import {Actions} from 'react-native-router-flux'
import {TextField} from "react-native-material-textfield";
import {Button} from "react-native-material-design";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'


export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            phone: "",
            secureTextEntry: true,
            invalid: {
                label: "Не правильный логин или пароль.",
                active: false,
            },
            errors: {
                phone: "",
                password: "",
            }

        }


        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.phoneMask = this.phoneMask.bind(this);
        this.validate = this.validate.bind(this);
        this.submit = this.submit.bind(this);
    }

    onAccessoryPress() {
        this.setState(({secureTextEntry}) => ({secureTextEntry: !secureTextEntry}));
    }

    phoneMask(phone) {
        this.setState({phone})
    }

    phoneMask1(phone) {
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

    validate() {
        let errors = {};
        let count_err = 0;
        ["phone", "password"].forEach((item, index) => {
            switch (item) {
                case "phone": {
                    if (this.state.phone.length !== 11) {
                        errors[item] = "Не корректный номер. Пример: 89870072589"
                        count_err++;
                    }
                    break;
                }
                case "password":
                    if (20 < this.state.password.length || this.state.password.length < 8) {
                        errors[item] = "Длина пароля должна быть не больше 20 и не меньше 8 символов"
                        count_err++;
                    }
                    break;
            }

        });
        this.setState({errors: errors});
        return count_err > 0;
    }

    submit() {
        Keyboard.dismiss()
        let invalid = this.state.invalid;
        invalid['active'] = false
        if (!this.validate()) {
            obj = {
                password: this.state.password,
                phoneNumber: this.state.phone,
            }
            axios.post('users/login', obj).then((resp) => {
                console.log(resp);
                this.saveKey('token', resp.data);
                axios.defaults.headers['Auth-token'] = resp.data;
                axios.get('users/profile').then((resp) => {
                        this.saveKey('name', resp.data.firstName);
                        this.saveKey('phone', resp.data.phoneNumber);
                    }
                )
                this.setState({invalid: invalid});
                Actions.map();
            }).catch((resp) => {
                if (resp.response.data.field && resp.response.data.field !== "phone and password") {
                    let field = resp.response.data.field;
                    let object = {};
                    object[field] = resp.response.data.message;
                    this.setState({"errors": object});
                } else {
                    invalid['active'] = true;
                    this.setState({invalid: invalid});
                }
                console.log("Error", resp);
                console.log(this.state);
            })
        }

    }

    async saveKey(key, value) {
        try {
            await AsyncStorage.setItem('@Store:' + key, value);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    render() {
        return (
            <View style={styles.authform}>
                <TextField
                    value={this.state.phone}
                    onChangeText={(phone) => this.phoneMask(phone)}
                    label={"Телефон"}
                    title={"В 11 числовом формате, начиная с 7 или 8"}
                    keyboardType={'phone-pad'}
                    error={this.state.errors.phone}
                />
                <TextField
                    label={"Пароль"}
                    secureTextEntry={this.state.secureTextEntry}
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.setState({password: password})
                    }}
                    autoCapitalize='none'
                    returnKeyType='done'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    characterRestriction={20}
                    maxLength={20}
                    error={this.state.errors.password}
                    renderAccessory={this.renderPasswordAccessory}
                />
                <View style={styles.loginView}>
                    <View style={styles.errorView}>
                        <Text style={styles.error}>
                            {this.state.invalid.active ? this.state.invalid.label : ""}
                        </Text>
                    </View>
                    <View style={styles.signInView}>
                        <Button
                            onPress={() => {
                                this.submit()
                            }}
                            raised={true}
                            text={'Войти'}
                        />
                    </View>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    fieldsView: {
        flex: 1,
    },
    authform: {
        flex: 1,
        padding: 15,
        flexDirection: "column",
        backgroundColor: "#fff",
    },
    registerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",

    },
    loginView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    errorView: {
        flex: 0.5,

    },
    signInView: {
        flex: 0.3,
    },
    error: {
        color: "red",
        left: 0,
        fontFamily: "Roboto",

    }

});

