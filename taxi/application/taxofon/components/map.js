import React, {Component} from 'react'
import {View} from "react-native";
import {TextField} from "react-native-material-textfield";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View>
                <TextField value={''}/>
            </View>
        )
    }

}