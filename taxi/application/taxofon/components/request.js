import React, {Component} from 'react'
import {View, StyleSheet, Text, KeyboardAvoidingView, Platform} from "react-native";
import {TextField} from "react-native-material-textfield";
import {Button} from "react-native-material-design";
import {Actions} from 'react-native-router-flux'


export default class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.data}
        this.checkout = this.checkout.bind(this)
    }

    componentDidMount() {
        console.log(this.state);
    }


    checkout() {
        console.log("Checkout")
    }

    render() {
        let source = this.state.sourceAddress.street_name_numb.split(": ")[1];
        let destination = this.state.destination.destination_address.split(": ")[1];

        return (
            <KeyboardAvoidingView style={styles.mainView} behavior="height">

                <View style={styles.mapFields}>
                    <TextField
                        labelFontSize={14}
                        label={'Откуда'}
                        value={source}
                        disabled={true}
                    />
                    <TextField
                        labelFontSize={14}
                        label={'Куда'}
                        disabled={true}
                        value={destination}
                    />
                    <KeyboardAvoidingView style={styles.costView} behavior="height">
                        <Text style={styles.costText}>
                            Стоимость заказа
                        </Text>
                        <Text style={styles.costValue}>
                            150 руб.
                        </Text>
                    </KeyboardAvoidingView>
                    <TextField
                        basePadding={0}
                        label={'Комментарий к заказу'}
                        multiline={true}
                        autoCorrect={false}
                        onChangeText={(comment) => {
                            this.setState({comment})
                        }}
                    />

                    <KeyboardAvoidingView style={styles.buttons}>
                        <Button
                            overrides={{
                                textColor: "#1075c5",
                            }}
                            style={styles.checkoutButton}
                            onPress={() => {
                                Actions.map()
                            }}
                            text={'Отменить заказ'}/>
                        <Button
                            overrides={{
                                textColor: "#1075c5",
                            }}
                            style={styles.checkoutButton}
                            onPress={() => {
                                this.checkout()
                            }}
                            text={'Оформить заказ'}/>
                    </KeyboardAvoidingView>
                </View>

            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column",
        margin: 10,
        minHeight: "100%",
    },
    mapFields: {
        flex: 1,
        paddingTop: -100,
        flexDirection: "column",

    },
    costView: {
        minWidth: "100%",
        minHeight: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    costText: {
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: 'bold',
        color: "black",
    },
    costValue: {
        fontFamily: "Roboto",
        color: "rgb(16, 117, 197)",
        fontSize: 16,
        fontWeight: 'bold',
    },

    checkoutButton: {
        fontFamily: "Roboto",
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});