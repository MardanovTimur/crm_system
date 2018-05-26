import React, {Component} from 'react'
import {
    ScrollView, Text, View, StyleSheet, AsyncStorage, Button as Btn, TouchableOpacity,
    StatusBar
} from "react-native";
import {Card, Button, Subheader, Toolbar} from "react-native-material-design";
import EvilIcon from "react-native-vector-icons/EvilIcons"
import FontAwesome from 'react-native-vector-icons/MaterialIcons'
import {Actions, ActionConst} from 'react-native-router-flux'
import {Alert} from "react-native";

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            name: "",
            phone: "",
        }
    }


    async getKeyToSave(key,) {
        try {
            const value = await AsyncStorage.getItem('@Store:' + key).then((val) => {
                let o = {};
                o[key] = val;
                this.setState(o);
            }).done();
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }


    componentDidMount() {
        console.log('Settings mounted');
        this.getKeyToSave('token')
        this.getKeyToSave('name')
        this.getKeyToSave('phone')
    }

    logout() {
        console.log('logout');
        AsyncStorage.removeItem('@Store:token')
        AsyncStorage.removeItem('@Store:phone')
        AsyncStorage.removeItem('@Store:name')
        AsyncStorage.removeItem('@Store:orderCount')
        AsyncStorage.removeItem('@Store:rating')
        Actions.register({'type': ActionConst.RESET})
    }

    render() {
        return (
            <ScrollView style={styles.scrollViewSettings}>
                <StatusBar
                    backgroundColor={"#555555"}
                    hidden={true}
                />
                <View>
                    <Toolbar
                        title={'Профиль'}
                        style={{backgroundColor: "black"}}
                    />
                </View>
                <Card style={styles.profile}>
                    <Card.Body>
                        <View style={styles.title}>
                            <EvilIcon style={styles.label} name={'user'} size={40}/>
                            <Text style={styles.value}>{this.state.name}</Text>
                        </View>
                        <View style={[styles.title, {marginTop: 5}]}>
                            <FontAwesome style={styles.phone_icon} name={'local-phone'} size={30}/>
                            <Text style={styles.value}>{this.state.phone}</Text>
                        </View>
                    </Card.Body>

                    <Card.Actions position="right">
                        <Button
                            text="Выйти из аккаунта"
                            onPress={this.logout}
                        />
                    </Card.Actions>
                </Card>

                <View style={styles.menu_items}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        Actions.rates()
                    }}>
                        <FontAwesome style={styles.historyIcon} name={'attach-money'} size={20}/>
                        <Text style={styles.buttonText}>Тарифы</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        Actions.support();
                    }}>
                        <FontAwesome style={styles.historyIcon} name={'verified-user'} size={20}/>
                        <Text style={styles.buttonText}>Служба поддержки</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        Alert.alert(
                            'Taxofon',
                            'Release v0.0',
                            [
                                {text: 'OK'},
                            ],
                            {cancelable: false}
                        )
                    }}>
                        <FontAwesome style={styles.historyIcon} name={'android'} size={20}/>
                        <Text style={styles.buttonText}>О приложении</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        flexDirection: "row",
        marginTop: 20,

    },

    label: {
        flex: 1,
        color: "black",
    },
    phone_icon: {
        flex: 1,
        color: "black",
        marginLeft: 6,
    },

    value: {
        flex: 4,
        color: "black",
        fontFamily: "Roboto",
        textAlign: "right",
        fontSize: 20,
        paddingRight: 6,
    },

    menu_items: {
        flex: 1,
        flexDirection: "column",
        marginVertical: 8,
        marginHorizontal: 15,
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0,
        shadowRadius: 3,
    },

    button: {
        width: '100%',
        backgroundColor: "#ffffff",
        height: 40,
        alignSelf: 'stretch',
        shadowColor: "#929292",
        flex: 1,
        flexDirection: 'row',
    },

    buttonText: {
        textAlign: "left",
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 20,
        color: "black",
    },

    historyIcon: {
        color: 'black',
        padding: 8,
    },

    profile: {
        marginTop: '20%',
        marginHorizontal: 15,
    },

    title: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000000',
    },

    scrollViewSettings: {
        backgroundColor: "#fff",
    }

});