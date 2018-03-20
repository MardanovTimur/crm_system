import React, {Component} from 'react'
import {Auth} from "./auth";
import MapView from "react-native-maps";
import {ScrollView, View, StyleSheet} from "react-native";

export default class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Auth/>*/}
                {/*<Button onPress={Actions.register} text={'Регистрация'} overrides={buttonStyle()}/>*/}
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
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
        bottom: 0
    }
});