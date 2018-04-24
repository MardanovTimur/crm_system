import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export default class SearchResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object: props.object
        }
        this.setLocation = this.setLocation.bind(this)
    }

    setLocation() {
        console.log('Destination clicked', this.props.object);
        this.props.parent.setLocation(this.props.object)
    }

    render() {
        return (
            <View style={styles.textView}>
                <Text onPress={() => {
                    this.setLocation()
                }} style={styles.text}>{this.props.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        paddingTop: 7,
        paddingLeft: 7,
        marginBottom: 10,
        color: "black",
    },
    textView: {
        flex: 1,
        width: "100%",
        backgroundColor: "#ececec",
        elevation: 2,
    }
});