import React, {Component} from 'react'
import {AsyncStorage, StyleSheet} from 'react-native'
import {Col, Text} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default class Class extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const choiced= 'rgba(48,83,255,1)';
        return (
            <Col style={styles.rate_col} onPress={() => {this.props.instance.pressed(this.props.k)}}>
                <MaterialCommunityIcons name={this.props.car_class} style={[styles.rate_icons, this.props.k === this.props.instance.state.rate ? {color: choiced} :[]]} size={50}/>
                <Text style={{fontSize: 13, }}>{this.props.text}</Text>
            </Col>
        )
    }
}

const styles = StyleSheet.create({
    rate_col: {
        width: '100%',
        alignItems: 'center',
    },
    rate_icons: {
        color: 'black',
    },
})