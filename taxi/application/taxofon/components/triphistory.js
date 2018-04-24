import React, {Component} from 'react'
import {StatusBar, View, StyleSheet, AsyncStorage, Image} from "react-native";
import axios from "axios";
import {Toolbar} from "react-native-material-design";
import {
    Badge,
    Body, Button, Card, CardItem, Container, Content, Footer, FooterTab, Header, Icon, Left, List, ListItem, Right,
    Text,
    Thumbnail, Title
} from "native-base";
import {Actions} from "react-native-router-flux";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {InteractionManager, Dimensions} from "react-native";


let API_KEY = 'AIzaSyC289IFz2r13GxkpUScoF_BZCoJDX2LktQ';

const {width, height} = Dimensions.get('window');
const ratio = width / 1.8 * height;

export default class TripHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            token: this.props.token,
            loading: true,
        }
        this.mapView = null;
        this.render_orders = this.render_orders.bind(this);
    }

    componentWillMount() {

    }

    async get_token() {
        let value = await AsyncStorage.getItem('@Store:token').then((value) => {
            if (value) {
                this.setState({token: value});
                axios.defaults.headers['Auth-token'] = value;
                axios.get('users/profile/orders', {params: {from: 0, count: 1000,}})
                    .then((resp) => {
                        console.log(resp);
                        this.setState({orders: resp.data});
                    })
                    .catch((resp) => {
                        console.log(resp.response)
                    })
            }
        }).done();
        return this.state.token
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.setState({loading: false});
        });
        this.get_token()

    }

    get_average(a, b) {
        return (parseFloat(a, 10) + parseFloat(b, 10)) / 2.0;
    }

    render_orders() {
        return this.state.orders.map((item, index) => {
            const latAverage = this.get_average(item.addressFrom.coordinateX, item.addressTo.coordinateX)
            const longAverage = this.get_average(item.addressFrom.coordinateY, item.addressTo.coordinateY)
            let mapView = null;
            const from = {
                latitude: parseFloat(item.addressFrom.coordinateX, 10),
                longitude: parseFloat(item.addressFrom.coordinateY, 10),
            }
            const to = {
                latitude: parseFloat(item.addressTo.coordinateX, 10),
                longitude: parseFloat(item.addressTo.coordinateY, 10),
            }


            return (
                <Card key={index} style={styles.cardStyle}>
                    <CardItem cardBody>
                        <View style={styles.mapViewStyle}>
                            {this.state.loading ? (
                                <Loading/>
                            ) : (
                                <MapView
                                    liteMode
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: 55.7,
                                        longitude: 49.3,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0922 * ratio * 1.4,
                                    }}
                                    ref={c => mapView = c}
                                >
                                    <MapView.Marker coordinate={from}/>
                                    <MapView.Marker coordinate={to}/>
                                    <MapViewDirections
                                        origin={from}
                                        destination={to}
                                        language={'ru'}
                                        resetOnChange={false}
                                        apikey={API_KEY}
                                        strokeWidth={3}
                                        strokeColor="black"
                                        onReady={(result) => {
                                            mapView.fitToCoordinates(result.coordinates, () => {
                                                return {
                                                    edgePadding: {
                                                        right: parseInt((width / 10), 10) + 40,
                                                        bottom: parseInt((height / 10), 10) + 40,
                                                        left: parseInt((width / 10), 10) + 40,
                                                        top: parseInt((height / 10), 10) + 40,
                                                    }
                                                }
                                            });
                                        }}
                                    />
                                </MapView>
                            )}
                        </View>

                    </CardItem>
                    <CardItem style={{flex: 1}}>
                        <Left style={{flex: 0.15}}>
                            <Badge style={{backgroundColor: 'black'}}>
                                <Text style={{color: 'white'}}>A</Text>
                            </Badge>
                        </Left>
                        <Body style={{flex: 0.55}}>
                        <Text>{item.addressFrom.street + " " + item.addressFrom.house}</Text>
                        </Body>
                        <Right style={{flex: 0.3}}>
                            <Text style={{fontFamily: "Roboto", fontWeight: 'bold', color: '#1075c5'}}>
                                {item.cost} руб.
                            </Text>
                        </Right>
                    </CardItem>
                    <CardItem style={{flex: 1}}>
                        <Left style={{flex: 0.15}}>
                            <Badge style={{backgroundColor: 'red'}}>
                                <Text style={{color: 'white'}}>B</Text>
                            </Badge>
                        </Left>
                        <Body style={{flex: 0.55}}>
                        <Text>{item.addressTo.street + " " + item.addressTo.house}</Text>
                        </Body>
                    </CardItem>
                </Card>
            )

        })
    }

    render() {
        const orders = this.render_orders()
        const {width, height} = Dimensions.get('window');
        const ratio = width / height;

        return (
            <Container style={{flex: 0.93}}>
                <StatusBar
                    backgroundColor={"#555555"}
                    hidden={true}
                />
                <Header style={{backgroundColor: '#000000'}}>
                    <Body style={{backgroundColor: 'black'}}>
                    <Title>История поездок</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <List>
                        {orders}
                    </List>
                </Content>
            </Container>


        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        marginLeft: 8,
        marginRight: 8,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    mapViewStyle: {
        width: width * 0.93,
        height: height / 3.0,
        margin: 5,
    }
});

const Loading = () => (
    <View style={styles.container}>
        <Text>Loading...</Text>
    </View>
);