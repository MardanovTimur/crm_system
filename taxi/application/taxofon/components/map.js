import React, {Component, PropTypes} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';



export default class Map extends Component {
    constructor(props) {
        super(props);

    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <MapView
                region={this.state.region}
                onRegionChange={this.onRegionChange}
            />
        );
    }
}