import React, {Component} from 'react'
import {ScrollView, Text, View, StyleSheet, AsyncStorage, Button as Btn, TouchableOpacity} from "react-native";
import {Card, Button, Subheader} from "react-native-material-design";
import EvilIcon from "react-native-vector-icons/EvilIcons"
import FontAwesome from 'react-native-vector-icons/MaterialIcons'
import {Actions} from 'react-native-router-flux'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    logout() {
        console.log('logout');
        Actions.initial()
    }

    render() {
        return (
            <ScrollView>

                <Card>
                    <Card.Body>
                        <View style={styles.title}>
                            <EvilIcon style={styles.label} name={'user'} size={50}/>
                            <Text style={styles.value}>Name</Text>
                        </View>
                        <View style={styles.title}>
                            <FontAwesome style={styles.label} name={'local-phone'} size={40}/>
                            <Text style={styles.value}>Phone number</Text>
                        </View>
                    </Card.Body>

                    <Card.Actions position="right">
                        <Button value="ВЫЙТИ" onPress={this.logout}/>
                    </Card.Actions>
                </Card>

                <View style={styles.menu_items}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        Actions.trip_history()
                    }}>
                        <FontAwesome style={styles.historyIcon} name={'history'} size={30}/>
                        <Text style={styles.buttonText}>История поездок</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        Actions.rates()
                    }}>
                        <FontAwesome style={styles.historyIcon} name={'attach-money'} size={30}/>
                        <Text style={styles.buttonText}>Тарифы</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        Actions.rates()
                    }}>
                        <FontAwesome style={styles.historyIcon} name={'verified-user'} size={30}/>
                        <Text style={styles.buttonText}>Служба поддержки</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        Actions.rates()
                    }}>
                        <FontAwesome style={styles.historyIcon} name={'android'} size={30}/>
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

    value: {
        flex: 4,
        color: "black",
        fontFamily: "Roboto",
        textAlign: "right",
        fontSize: 20,
    },

    menu_items: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 2,
        margin: 8,
        borderColor: 'rgba(153,153,153,.4)',
    },

    button: {
        width: '100%',
        backgroundColor: "#ffffff",
        height: 40,
        alignSelf: 'stretch',
        shadowColor:"#929292",
        flex:1,
        flexDirection:'row',
    },

    buttonText: {
        textAlign: "left",
        paddingTop: 5,
        paddingLeft: 10,
        fontSize: 20,
        color: "black",
    },

    historyIcon: {
        color:'black',
        padding:2,
    }

});