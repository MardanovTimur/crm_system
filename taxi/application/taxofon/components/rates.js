import React, {Component} from 'react'
import {AsyncStorage, StyleSheet} from 'react-native'
import {Col, Container, Content, Grid, Text} from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Class from './class'
import RatesInfo from "./rates_info";

export default class Rates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 0,
        }
        this.getRate = this.getRate.bind(this);
    }

    async saveKey(key, value) {
        try {
            await AsyncStorage.setItem('@Store:' + key, String(value));
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    async getRate() {
        try {
            const value = await AsyncStorage.getItem('@Store:rate').then((val) => {
                this.setState({rate:parseInt(val, 10)});
                console.log('Rate is setted');
            }).done();
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }


    componentDidMount() {
    }

    componentWillMount() {
        this.getRate()
    }

    pressed(rate) {
        this.setState({rate: rate})
        this.saveKey('rate', rate);
    }

    render() {
        let choiced_rate = this.state.rate;
        return (
            <Container style={styles.rate_container}>
                <Content>
                    <Text style={styles.tarif_text}>Ваш текущий тариф по умолчанию.</Text>
                    <Grid style={styles.rates_grid}>
                        <Class k={0} car_class={'car-hatchback'} instance={this} text={'Эконом'}/>
                        <Class k={1} car_class={'car-convertible'} instance={this} text={'Комфорт'}/>
                        <Class k={2} car_class={'car-sports'} instance={this} text={'Бизнес'}/>
                    </Grid>
                </Content>
                <RatesInfo rate={choiced_rate}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    rate_container: {
        backgroundColor: "white",
        padding: 5,
        flex: 0.4,

    },
    tarif_text: {
        paddingLeft: 10,
    },
    rates_grid: {
        alignItems: 'center',
    },

})