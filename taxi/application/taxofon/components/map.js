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

const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let PLACE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address={a},{b}&language=ru";

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
            markerPosition: {
                latitude: 55.797520,
                longitude: 49.114933,
            },
            sourceAddress: {
                street_name_numb: "",
            }
        }

        this.defineLocation = this.defineLocation.bind(this)
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    watchID: ?number = null;

    defineLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                let initialRegion = {
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
        console.log('React');
        this.defineLocation();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


    onDragEnd(data) {
        let a = [data.latitude, data.longitude];
        axios.get(PLACE_URL.replace('{a}', a[0]).replace('{b}', a[1]))
            .then((resp) => {
                console.log(resp);
                let data = resp.data.results.filter((item, index) => {
                    return item.types.contains('street_address')
                });
                console.log(data);
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
                        street_name_numb: street_name[0].short_name + ", " + street_number[0].short_name,
                        geometry: data[0].geometry,
                    }
                    this.setState({sourceAddress: source})
                }
                console.log(this.state)

            })
            .catch((resp) => {
                console.log(resp);
            })
    }

    render() {
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

                </MapView>


                <View style={styles.allNonMapThings}>
                    <View style={styles.inputContainer}>
                        <Icon style={styles.searchIcon} name="search" size={30} color="#000"/>
                        <TextInput
                            placeholder={"Куда?"}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                        />
                    </View>

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
                            overrides={buttonStyle({margin:100})}
                            onPress={() => {
                                Actions.menu_initial()
                            }}
                            title="Настройки"
                            style={styles.settings}
                        />

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
    inputContainer: {
        elevation: 1,
        backgroundColor: 'white',
        width: '90%',
        flexDirection: "row",
        height: 40,
        top: 17,
        borderRadius: 3,
        shadowOpacity: 0.75,
        shadowRadius: 1,
        shadowColor: 'gray',
        shadowOffset: {height: 0, width: 0}
    },
    //Find textarea style
    input: {
        height: 40,
        width: '90%',
        marginLeft: 5,
        marginRight: 5,

    },

    //SearchIcon
    searchIcon: {
        marginTop: 6,
    },

    settings: {
        flex: 1,
        alignItems: "center",
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

    sourceText: {
        fontSize: 20,
        fontFamily: "Roboto",
        color: "red",
    },


    buttons: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'transparent',
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