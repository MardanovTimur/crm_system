import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Settings from "./components/settings";
import About from "./components/about";
import TripHistory from "./components/triphistory";
import Support from "./components/support";
import Rates from "./components/rates";
import {Register} from "./components/register";
import Auth from "./components/auth";
import Request from "./components/request"
import Map from './components/map'
import {AsyncStorage} from "react-native";
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
        //this.get_scenes = this.get_scenes.bind(this);
        this.get_token = this.get_token.bind(this);
    }

    componentWillMount() {
        this.get_token();
    }

    componentDidMount() {
        console.disableYellowBox = true;
        console.log("Component is load");
    }

    async get_token() {
        let value = await AsyncStorage.getItem('@Store:token').then((value) => {
            if (value) {
                this.setState({token: value, signedIn: !this.state.signedIn});
                axios.defaults.headers.common['Auth-token'] = value;
                Actions.map({token: value});
            }
        }).done();
        return this.state.token
    }

    get_scenes() {
        return (
            <Scene key="root"
                   titleStyle={{color: "white"}}
                   navigationBarStyle={{backgroundColor: 'black'}}
            >
                <Scene key={'initial'} barButtonIconStyle={{color: "#FFF"}}
                       title={'Войти в аккаунт'} component={Auth} initial={false}/>

                <Scene key={"register"}
                       component={Register}
                       title={'Taxofon'}
                       type={'replace'}
                       initial={!this.state.signedIn}
                />

                <Scene hideNavBar={true}
                       key={'map'}
                       title={'Map'}
                       initial={this.state.signedIn}
                       component={Map}
                       onBack={() => {
                           console.log('Back touched')
                       }}
                />
                <Scene key={'menu_initial'} type="replace" title={'Настройки'} initial={false} component={Settings}/>
                <Scene key={'trip_history'} title={'История поездок'} component={TripHistory}/>
                <Scene key={'rates'} title={'Тарифы'} component={Rates}/>
                <Scene key={'support'} title={'Служба поддержки'} component={Support}/>
                <Scene key={'request'} title={'Оформление заказа'} initial={false} component={Request}/>
                <Scene key={'about'} title={'О приложении'} component={About}/>
            </Scene>
        );
    }

    render() {
        console.log(this.state);
        return (
            <Router
                barButtonIconStyle={styles.barButtonIconStyle}
                headerBackTitle={'Tilbage'}
                tintColor='white'
            >
                {this.get_scenes()}
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
    barButtonIconStyle: {
        tintColor: '#ffffff',
        backgroundColor: "white"

    }
});
