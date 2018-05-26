import React, {Component} from 'react'
import {StatusBar, StyleSheet, TextInput} from 'react-native'
import {Button, Container, Text} from "native-base";
import Stars from "./stars";
import {Actions} from 'react-native-router-flux'
/*
* Timur Mardanov :))))))0 Никто не смотрит мои коммиты(((((((
* Это наверное мой последний коммит. Не хочу больше ничего делать.
* Я устал. Учеба это кайф конечно, но и не кайф одновременно.
*
* Хочу улететь далеко далеко и забыть про этот код навсегда
* */

export default class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ""
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    getStar(index) {
        this.setState({starIndex: index})
    }

    render() {
        return (
            <Container style={{backgroundColor: "white"}}>
                <StatusBar
                    backgroundColor={"#555555"}
                    hidden={true}
                />
                <Container style={styles.mainContainer}>
                    <Text style={styles.costStyle}>121 ₽</Text>
                    <Text style={styles.details} onPress={() => {alert('Pressed details')}}>Детали поездки</Text>
                </Container>

                <Container style={styles.starsContainer}>
                    <Stars size={5} parent={this}/>
                </Container>
                <Container style={styles.commentContainer}>
                    <TextInput
                        style={{width: '90%'}}
                        multiline={true}
                        editable = {true}
                        autoCorrect={true}
                        placeholder={'Написать отзыв'}
                        onChangeText={(comment) => {this.setState({'comment':comment})}}
                    />
                </Container>
                <Container style={styles.acceptButtonContainer}>
                    <Button style={{marginLeft: "70%"}} onPress={() => {Actions.map()}} rounded dark>
                        <Text> Готово </Text>
                    </Button>
                </Container>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    acceptButtonContainer: {
        alignItems:"flex-end",
        justifyContent: "center",

    },
    commentContainer: {
        flex: 0.9,
        alignItems: "center",



    },
    starsContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: '7%',
    },
    mainContainer: {
        alignItems: "center",
        justifyContent: "center",

    },
    costStyle: {
        fontSize: 70,
        fontFamily: "Roboto; sans-serif"
    },
    details: {
        textDecorationLine: "underline",
    }

});