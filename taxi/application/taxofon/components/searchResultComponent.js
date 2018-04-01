import React, {Component} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'

export default class SearchResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            object : props.object
        }
        this.setLocation = this.setLocation.bind(this)
    }

    setLocation() {
        this.props.parent.setLocation(this.state.object)
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.element}
                onPress={() => {
                    this.setLocation()
                }}
            >
                <View style={styles.textView}>
                    <Text style={styles.text}>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    element: {
        flex: 1,
        marginBottom: '2%',
        width: '100%',
        height: 40,
    },
    text: {
        fontSize: 16,
        paddingTop: 7,
        paddingLeft: 7,
        color: "black",
    },
    textView: {
        flex: 1,
        width: "100%",
        backgroundColor: "red",

    }
});