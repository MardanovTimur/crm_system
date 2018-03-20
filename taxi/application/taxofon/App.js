import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import Settings from "./components/settings";
import About from "./components/about";
import TripHistory from "./components/triphistory";
import Support from "./components/support";
import Rates from "./components/rates";
import {Register} from "./components/register";
import Initial from "./components/initial";
import Map from './components/map'
import AsyncStorage from "react-native";

type Props = {};

export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
        };
    }

    componentDidMount() {
        try {
            console.log('Reload');
            const token = AsyncStorage.getItem('@TokenStore:token');
            if (value !== null) {
                this.setState({token});
            }
        } catch (error) {
            this.setState({token: null});
        }
    }

    render() {
        let main_scene;
        (this.state.token) ? main_scene = true: main_scene = false;
        let scene = (
            <Scene key="root">
                <Scene hideNavBar={true} key={'initial'} title={'Map'} initial={main_scene} component={Map}/>
                <Scene key={'menu_initial'} title={'Настройки'} component={Settings}/>
                <Scene key={'trip_history'} title={'История поездок'} component={TripHistory}/>
                <Scene key={'rates'} title={'Тарифы'} component={Rates}/>
                <Scene key={'support'} title={'Служба поддержки'} component={Support}/>
                <Scene key={'about'} title={'О приложении'} component={About}/>
                <Scene key={'initial'} title={'Taxofon'} component={Initial} initial={!main_scene}/>
                <Scene key={"register"} component={Register} title={'Регистрация'}/>
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
