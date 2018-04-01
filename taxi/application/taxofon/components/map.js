import React, {Component, PropTypes} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions} from 'react-native';
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
        }

        this.defineLocation = this.defineLocation.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
        this.setLocation = this.setLocation.bind(this);
    }

    watchID: ?number = null;

    defineLocation() {
        let initialRegion;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                initialRegion = {
                    latitude: lat,
                    longtitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longtitudeDelta: LONGTITUDE_DELTA,
                }

                this.setState({initialPosition: initialRegion})
                this.setState({markerPosition: initialRegion})

            },
            (error) => {
                alert('Не удалось найти ваше местоположение.', 'Ошибка');
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        )

        this.watchID = navigator.geolocation.watchPosition((position) => {
            let lat = parseFloat(position.coords.latitude)
            let long = parseFloat(position.coords.longtitude)

            let lastRegion = {
                latitude: lat,
                longtitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longtitudeDelta: LONGTITUDE_DELTA,
            }

            this.setState({initialPosition: initialRegion})
            this.setState({markerPosition: initialRegion})
        })
    }

    componentDidMount() {
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
        }
        this.setState({destination: data, searchResults: []})
    }

    render() {
        let search = <SearchResults parent={this} data={this.state.searchResults}/>
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
                    strokeColor="hotpink"
                />
            )
            console.log(destination);
        }
        let ready_button = (
            <Button
                raised={true}
                overrides={buttonStyle()}
                onPress={() => {
                    Actions.menu_initial()
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
                >
                    {destination}
                </MapView>


                <View style={styles.allNonMapThings}>


                    {search}


                    <View style={styles.sourceIconView}>
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
                        <View style={{flex: 2,}}>
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
        top: '50%'

    },

    sourceTextView: {
        elevation: 1,
        flex: 1,
        position: "absolute",
        top: '56%',
    },

    destinationTextView: {
        elevation: 1,
        flex: 1,
        position: "absolute",
        top: '60%',
    },

    sourceText: {
        fontSize: 20,
        fontFamily: "Roboto",
        color: "red",
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