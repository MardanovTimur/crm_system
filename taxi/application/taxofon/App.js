import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Settings from "./components/settings";
import About from "./components/about";
import TripHistory from "./components/triphistory";
import Support from "./components/support";
import Rates from "./components/rates";
import {Register} from "./components/register";
import Request from "./components/request"
import Initial from "./components/initial";
import Map from './components/map'
import AsyncStorage from "react-native";
import axios from 'axios'

type Props = {};

console.disableYellowBox = true;

axios.defaults.baseURL = 'http://crm-sys.herokuapp.com/';
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            signedIn: false,
        };
    }

    componentDidMount() {
        console.disableYellowBox = true;
        try {
            const token = AsyncStorage.getItem('@Store:token');
            console.log(token);
            if (token !== null) {
                this.setState({token: token, signedIn: !this.state.signedIn});
                axios.defaults.headers.post['Auth-token'] = token
            }
        } catch (error) {
            console.log("Error in getting Token from Store");
            this.setState({token: null});
        }
    }

    render() {
        let scene = (
            <Scene key="root">
                <Scene key={'initial'} title={'Taxofon'} component={Initial} initial={!this.state.signedIn}/>
                <Scene key={"register"} component={Register} title={'Регистрация'}/>
                <Scene hideNavBar={true} key={'map'} title={'Map'} initial={this.state.signedIn} component={Map}/>
                <Scene key={'menu_initial'} title={'Настройки'} initial={false} component={Settings}/>
                <Scene key={'trip_history'} title={'История поездок'} component={TripHistory}/>
                <Scene key={'rates'} title={'Тарифы'} component={Rates}/>
                <Scene key={'support'} title={'Служба поддержки'} component={Support}/>
                <Scene key={'request'} title={'Оформление заказа'} initial={false} component={Request}/>
                <Scene key={'about'} title={'О приложении'} component={About}/>
            </Scene>
        );
        return (
            <Router>
                {scene}
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
