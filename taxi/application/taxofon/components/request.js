import React, {Component} from 'react'
import {View, StyleSheet, Text, KeyboardAvoidingView, Platform, ListView, ScrollView, AsyncStorage} from "react-native";
import {TextField} from "react-native-material-textfield";
import {Button} from "react-native-material-design";
import {Actions} from 'react-native-router-flux'
import axios from 'axios'
import {Container, Grid, Spinner} from "native-base";
import Class from "./class";
import RatesInfo from "./rates_info";

export default class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.data,
            rate: 0
        }
        this.checkout = this.checkout.bind(this)
    }

    componentDidMount() {
        console.log(this.state);
        this.setState({errorText: "", buttonActive: true})
    }

    componentWillMount() {
        this.getRate()
    }


    pressed(rate) {
        this.setState({rate: rate})
    }

    checkout() {
        let post_object = {
            addressFrom: {
                coordinateX: this.state.destination.source.latitude,
                coordinateY: this.state.destination.source.longitude,
                house: parseInt(this.state.sourceAddress.street_number, 10),
                housing: 0,
                street: this.state.sourceAddress.street_name
            },
            addressTo: {
                coordinateX: this.state.destination.destination.latitude,
                coordinateY: this.state.destination.destination.longitude,
                house: parseInt(this.state.destination.destination_address_numb, 10),
                housing: 0,
                street: this.state.destination.destination_address_street,
            },
            comment: this.state.comment,
            distance: this.state.distance,
            tariff: "BUSINESS",
        }
        axios.post('users/profile/orders/add', post_object)
            .then((resp) => {
                console.log(resp);
                Actions.success_order();
            })
            .catch((resp) => {
                this.setState({errorText: resp.response.data.message, buttonActive: false})
                Actions.success_order();
            });
    }

    async getRate() {
        try {
            const value = await AsyncStorage.getItem('@Store:rate').then((val) => {
                this.setState({rate: parseInt(val, 10)});
            }).done();
        } catch (error) {
        }
    }


    render() {
        let source = this.state.sourceAddress.street_name_numb.split(": ")[1];
        let destination = this.state.destination.destination_address.split(": ")[1];

        return (
            <ScrollView style={styles.mainView}>
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

                    <Grid style={styles.rates_grid}>
                        <Class k={0} car_class={'car-hatchback'} instance={this} text={'Эконом'}/>
                        <Class k={1} car_class={'car-convertible'} instance={this} text={'Комфорт'}/>
                        <Class k={2} car_class={'car-sports'} instance={this} text={'Бизнес'}/>
                    </Grid>

                    <RatesInfo rate={this.state.rate}/>
                    <KeyboardAvoidingView style={styles.costView} behavior="height">
                        <Text style={styles.costText}>
                            Стоимость заказа
                        </Text>
                        {/*<Text style={styles.costValue}>*/}
                        {/*139 Р.*/}
                        {/*</Text>*/}
                        <Spinner color='blue'/>
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
                                this.checkout()
                            }}
                            disabled={!this.state.buttonActive}
                            text={'Оформить заказ'}/>
                    </KeyboardAvoidingView>
                    <Text style={styles.errorText}>
                        {this.state.errorText}
                    </Text>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column",
        minHeight: "100%",
        backgroundColor: 'white',
        padding: 10,
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
        marginBottom: 20,
    },
    scrollViewOrder: {
        flex: 1,
    },
    errorText: {
        fontFamily: "Roboto",
        color: "red",

    },
    rates_grid: {
        alignItems: 'center',
        paddingVertical: 10,
    },
});