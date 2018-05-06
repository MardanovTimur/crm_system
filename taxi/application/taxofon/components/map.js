import React, {Component, PropTypes} from 'react'
import {
    View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, Keyboard, Image,
    StatusBar, AsyncStorage, BackHandler
} from 'react-native';
import MapView from 'react-native-maps';
import Icon from "react-native-vector-icons/EvilIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {checkPermission} from 'react-native-android-permissions';
import {Button} from "react-native";
import axios from 'axios'
import {Actions, Scene} from 'react-native-router-flux'
import {buttonStyle} from "../styles/buttons";
import SearchResults from "./searchResults";
import SearchResult from "./searchResultComponent";
import MapViewDirections from 'react-native-maps-directions'
import Tabbar from 'react-native-tabbar-bottom'
import {PermissionsAndroid} from 'react-native';
import Settings from './settings'
import TripHistory from "./triphistory";

const MK = require('react-native-material-kit');


const {
    MKButton,
    MKColor,
} = MK;

const {width, height} = Dimensions.get('window');
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let API_KEY = 'AIzaSyC289IFz2r13GxkpUScoF_BZCoJDX2LktQ';


Array.prototype.contains = function (element) {
    return this.indexOf(element) > -1;
};

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "map",
            initialPosition: {
                latitude: 55.797520,
                longitude: 49.114933,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            sourceAddress: {
                street_name_numb: "Откуда: ",
            },
            searchResults: [],
            destination: {},
            line: false,
            orderCount: 0,
            token: this.props.token,
        }

        console.log("token = ", props.token);

        this.defineLocation = this.defineLocation.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this);
        this.calculateDistanceAndTime = this.calculateDistanceAndTime.bind(this);
        this.mapView = null;
    }

    watchID: ?number = null;

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

    defineLocation() {
        let initialRegion;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Started defining location on ANDROID")

                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGTITUDE_DELTA,
                }
                console.log("location - ", initialRegion);
                this.setState({initialPosition: initialRegion})
            },
            (error) => {
                console.log("Failed define location")
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }

    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Требуется GPS для корректной работы приложения',
                    'message': 'Дадада'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the gps")
                let initialRegion;
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log("Started defining location on ANDROID")

                        let lat = parseFloat(position.coords.latitude);
                        let long = parseFloat(position.coords.longitude);
                        initialRegion = {
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGTITUDE_DELTA,
                        }
                        console.log("location - ", initialRegion);
                        this.setState({initialPosition: initialRegion})
                    },
                    (error) => {
                        console.log("Failed define location")
                    },
                    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                )
            } else {
                console.log("GPS permissions denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentWillMount() {
        Keyboard.dismiss()
        this.getKeyToSave('orderCount');
    }

    componentDidMount() {
        this.requestCameraPermission();
        this.defineLocation();
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
        console.log(this.props);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
    }

    onBackButtonPressAndroid = () => {
        console.log('Exit');
        return true;
    };


    onDragEnd(data) {
        let PLACE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address={a},{b}&language=ru";
        let a = [data.latitude, data.longitude];
        axios.get(PLACE_URL.replace('{a}', a[0]).replace('{b}', a[1]))
            .then((resp) => {
                let data = resp.data.results.filter((item, index) => {
                    return item.types.contains('street_address')
                });
                if (data.length > 0) {
                    let street_name = data[0].address_components.filter((item, index) => {
                        return item.types.contains('route');
                    })
                    let street_number = data[0].address_components.filter((item, index) => {
                        return item.types.contains('street_number');
                    })
                    let source = {
                        street_name: street_name[0].short_name,
                        street_number: street_number[0].short_name,
                        street_name_numb: "Откуда: " + street_name[0].short_name + ", " + street_number[0].short_name,
                        geometry: data[0].geometry,
                    }
                    this.setState({
                        sourceAddress: source,
                    })


                    if (Object.keys(this.state.destination).length > 0) {
                        this.setState({
                            destination: {
                                source: {
                                    latitude: source.geometry.location.lat,
                                    longitude: source.geometry.location.lng,
                                },
                                destination: {
                                    latitude: this.state.destination.destination.latitude,
                                    longitude: this.state.destination.destination.longitude,
                                },
                                destination_address: this.state.destination.destination_address
                            }
                        })
                    }
                }
                console.log('RELOAD PLACE', this.state)

            })
            .catch((resp) => {
                console.log(resp);
            })
    }


    setLocation(element) {
        console.log('Set location - ', element);
        const data = {
            source: {
                latitude: this.state.sourceAddress.geometry.location.lat,
                longitude: this.state.sourceAddress.geometry.location.lng,
            },
            destination: {
                latitude: element.geometry.location.lat,
                longitude: element.geometry.location.lng,
            },
            destination_address: "Куда: " + element.street_name_numb,
            destination_address_street: element.street_name,
            destination_address_numb: element.street_number,
        };
        this.setState({destination: data, searchResults: [], line: true});
    }

    dismissLocation() {
        this.setState({line: false, destination: {}, searchResults: [], distance: "", distanceText: "", time: ""});
    }

    calculateDistanceAndTime(result) {
        this.setState({
            distance: (result.distance).toFixed(2),
            distanceText: (result.distance).toFixed(2) + " км.",
            time: parseInt(result.duration, 10) + ' мин.',
        });
        console.log('CalculateDistance function ', this.state);
    }

    ready() {
        Actions.request({data: this.state})
    }

    render() {
        let ready_ = true;
        const token = this.state.token;
        let destination;
        if (Object.keys(this.state.destination).length > 0) {
            ready_ = false
            destination = [
                (<MapView.Marker key={1} coordinate={this.state.destination.source}/>),
                (<MapView.Marker key={2} coordinate={this.state.destination.destination}/>),
                (<MapViewDirections
                        origin={this.state.destination.source}
                        destination={this.state.destination.destination}
                        language={'ru'}
                        resetOnChange={false}
                        apikey={API_KEY}
                        strokeWidth={5}
                        strokeColor="black"
                        onReady={(result) => {
                            this.calculateDistanceAndTime(result);

                            this.mapView.fitToCoordinates(result.coordinates, () => {
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
                )]
        }

        const orderCounts = this.state.orderCount;
        const Ready = MKButton.coloredFab()
            .withBackgroundColor(!ready_ ? MKColor.Blue : '#919191')
            .withOnPress(() => {
                this.ready()
            })
            .withStyle({width: 70, height: 70})
            .build();


        return (
            <View style={{flex: 1,}}>
                <StatusBar
                    backgroundColor={"#555555"}
                    hidden={true}
                />
                {this.state.page === "map" &&
                <View style={{flex: 0.93,}}>
                    <MapView
                        onRegionChangeComplete={(data) => {
                            if (!this.state.line)
                                this.onDragEnd(data)
                        }}
                        style={styles.map}
                        initialRegion={this.state.initialPosition}
                        maxZoomLevel={20}
                        minZoomLevel={12}
                        showsMyLocationButton={false}
                        showsUserLocation={false}
                        showsCompass={false}
                        rotateEnabled={false}
                        showsTraffic={false}
                        showsBuildings={true}
                        ref={c => this.mapView = c}
                    >
                        {destination}
                    </MapView>


                    <View style={styles.allNonMapThings}>
                        <SearchResults parent={this} data={this.state.searchResults}/>

                        <View pointerEvents={'none'}
                              style={[styles.sourceIconView, this.state.line ? {display: 'none'} : {}]}>
                            <FontAwesome
                                name={'map-marker'}
                                color={"red"}
                                backgroundColor={'transparent'}
                                size={40}
                            />
                        </View>
                        <View pointerEvents={'none'} style={styles.sourceTextView}>
                            <Text
                                style={styles.sourceText}>
                                {this.state.sourceAddress.street_name_numb}
                            </Text>
                        </View>

                        <View pointerEvents={'none'} style={styles.destinationTextView}>
                            <Text
                                style={styles.sourceText}>
                                {this.state.destination.destination_address}
                            </Text>
                        </View>

                        <View pointerEvents={'none'} style={styles.traceInformation}>
                            <Text style={styles.sourceText}>
                                {this.state.time}
                            </Text>
                        </View>


                        <View
                            style={styles.gpsIcon}>
                            <MaterialIcons.Button
                                style={{marginRight: -10}}
                                name='gps-fixed'
                                size={30}
                                backgroundColor={"white"}
                                color={'black'}
                                onPress={this.defineLocation}
                            />
                        </View>

                        <View style={styles.buttons}>
                            <View style={{
                                flex: 2,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                                <View style={[{
                                    flex: 1,
                                    alignItems: "flex-start",
                                    justifyContent: "space-between"
                                }, !this.state.line ? {display: 'none'} : {}]}>
                                    <Button
                                        raised={true}
                                        theme='dark'
                                        color={'red'}
                                        onPress={() => {
                                            this.dismissLocation()
                                        }}
                                        title={"Отмена"}
                                    />
                                </View>
                            </View>
                            <Ready enabled={!ready_}>
                                <MaterialIcons name={'navigate-next'} style={{color: 'white'}} size={35}/>
                            </Ready>
                        </View>
                    </View>
                </View>
                }
                {this.state.page === 'settings' && <Settings token={token}/>}
                {this.state.page === 'trips' && <TripHistory token={token}/>}

                <Tabbar
                    stateFunc={(tab) => {
                        this.setState({page: tab.page})
                        //this.props.navigation.setParams({tabTitle: tab.title})
                    }}
                    tabbarBgColor={'#ffffff'}
                    iconColor={'#000000'}
                    selectedIconColor={'#1075c5'}
                    rippleColor={'#000000'}
                    labelColor={'#000000'}
                    selectedLabelColor={'#000000'}
                    activePage={this.state.page}
                    tabs={[
                        {
                            page: "map",
                            icon: "map",
                            iconText: 'Карта',
                        },
                        {
                            page: "settings",
                            icon: "contact",
                            iconText: "Профиль",
                        },
                        {
                            page: "trips",
                            icon: "car",
                            iconText: 'Мои поездки',
                            badgeNumber: parseInt(orderCounts, 10),
                        },
                    ]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    allNonMapThings: {
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },

    settings: {
        flex: 1,
        alignItems: "center",
        marginLeft: '20%',
        color: 'black',
    },

    //GpsIcon
    gpsIcon: {
        position: 'absolute',
        elevation: 1,
        flex: 1,
        top: '70%',
        right: '1%',
    },

    //SourceIconView
    sourceIconView: {
        elevation: 1,
        flex: 1,
        position: "absolute",
        top: '45%',

    },

    sourceTextView: {
        elevation: 1,
        flex: 1,
        position: "absolute",
        top: '10%',
    },

    destinationTextView: {
        elevation: 1,
        flex: 1,
        position: "absolute",
        top: '15%',
    },

    sourceText: {
        fontSize: 21,
        fontFamily: "Roboto",
        color: "black",
        fontWeight: "bold",
    },


    buttons: {
        flex: 3,
        flexDirection: "row",
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'transparent',
        width: '90%',
    },

    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',

    },
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    traceInformation: {
        elevation: 1,
        flex: 1,
        position: "absolute",
        top: "51%",
    }
});