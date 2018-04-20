import React, {Component, PropTypes} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions, Keyboard} from 'react-native';
import MapView from 'react-native-maps';
import Icon from "react-native-vector-icons/EvilIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {checkPermission} from 'react-native-android-permissions';
import {Button} from "react-native";
import axios from 'axios'
import {Actions} from 'react-native-router-flux'
import {buttonStyle} from "../styles/buttons";
import SearchResults from "./searchResults";
import SearchResult from "./searchResultComponent";
import MapViewDirections from 'react-native-maps-directions'
import {PermissionsAndroid} from 'react-native';

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
        }

        this.defineLocation = this.defineLocation.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this);
        this.mapView = null;
    }

    watchID: ?number = null;

    defineLocation() {
        let initialRegion;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Started defining location on ANDROID")

                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                initialRegion = {
                    latitude: lat,
                    longtitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longtitudeDelta: LONGTITUDE_DELTA,
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
    }

    componentDidMount() {
        this.requestCameraPermission();
        this.defineLocation();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


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
        const data = {
            source: {
                latitude: this.state.sourceAddress.geometry.location.lat,
                longitude: this.state.sourceAddress.geometry.location.lng,
            },
            destination: {
                latitude: element.geometry.location.lat,
                longitude: element.geometry.location.lng,
            },
            destination_address: "Куда: " + element.street_name_numb
        };
        this.setState({destination: data, searchResults: [], line: true});
    }

    dismissLocation() {
        this.setState({line: false, destination: {}, searchResults: []});
    }

    render() {
        let ready_ = true;
        let destination;
        if (Object.keys(this.state.destination).length > 0) {
            ready_ = false
            destination = (
                <MapViewDirections
                    origin={this.state.destination.source}
                    destination={this.state.destination.destination}
                    language={'ru'}
                    resetOnChange={false}
                    apikey={API_KEY}
                    strokeWidth={5}
                    strokeColor="blue"
                    onReady={(result) => {
                        console.log("RESULT = ", result)
                        this.mapView.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: parseInt((width / 10), 10) + 40,
                                bottom: parseInt((height / 10), 10) + 40,
                                left: parseInt((width / 10), 10) + 40,
                                top: parseInt((height / 10), 10) + 40,
                            }
                        });
                    }}
                />
            )
        }
        let ready_button = (
            <Button
                raised={true}
                overrides={buttonStyle()}
                onPress={() => {
                    Actions.request({data: this.state})
                }}
                title="Поехали"
                disabled={ready_}
                color={'#FF0081'}
                style={styles.settings}
            />
        )

        return (
            <View style={styles.container}>
                <MapView
                    onRegionChangeComplete={(data) => {
                        if (!this.state.line)
                            this.onDragEnd(data)
                    }}
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                    maxZoomLevel={20}
                    minZoomLevel={15}
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

                    <View style={[styles.sourceIconView, this.state.line ? {display: 'none'} : {}]}>
                        <FontAwesome
                            name={'map-marker'}
                            color={"red"}
                            backgroundColor={'transparent'}
                            size={40}
                        />
                    </View>
                    <View style={styles.sourceTextView}>
                        <Text
                            style={styles.sourceText}>
                            {this.state.sourceAddress.street_name_numb}
                        </Text>
                    </View>

                    <View style={styles.destinationTextView}>
                        <Text
                            style={styles.sourceText}>
                            {this.state.destination.destination_address}
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
                        <Button
                            raised={true}
                            overrides={buttonStyle({margin: 100})}
                            onPress={() => {
                                Actions.menu_initial()
                            }}
                            title="Настройки"
                            style={styles.settings}
                        />
                        <View style={{
                            flex: 2,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <View style={[{flex: 1, alignItems: "center", justifyContent: "space-between"}, !this.state.line ? {display: 'none'} : {}]}>
                                <Button
                                    raised={true}
                                    color={'red'}
                                    onPress={() => {
                                        this.dismissLocation()
                                    }}
                                    title={"Отменить"}
                                />
                            </View>
                        </View>

                        {ready_button}

                    </View>
                </View>
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
        bottom: 0
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
        top: '80%',
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
        top: '51%',
    },

    sourceText: {
        fontSize: 20,
        fontFamily: "Roboto",
        color: "red",
        fontWeight: "bold",
    },


    buttons: {
        flex: 1,
        flexDirection: "row",
        position: 'absolute',
        bottom: 20,
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
    }
});