import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Container, Text} from "native-base";

export default class RatesInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            0: {
                cars: ['Lada', 'Daewoo', 'Kia', 'Renault'],
                text: "Водители и машины со средними оценками",
                people_size: 4,
                back_size: 2,
            },
            1: {
                cars: ['Volkswagen', 'Hyndai', 'Mazda', 'Suzuki'],
                text: "Вручную отобранные водители и машины с высокими оценками",
                people_size: 4,
                back_size: 3,
            },
            2: {
                cars: ['Porshe', 'Mercedes', 'Toyota', 'BMW'],
                text: "Вручную отобранные водители и машины с найлучшими оценками",
                people_size: 3,
                back_size: 4,
            }
        }

    }

    render() {
        let rate = this.state[this.props.rate];
        let cars = rate.cars.reduce((prev, current, index, array) => {
            return prev + ", " + current;
        })
        return (
            <Container style={styles.container}>
                <Container style={styles.tableContainer}>
                    <Text>Количество пассажиров</Text>
                    <Text>{rate.people_size}</Text>
                </Container>
                <Container style={styles.tableContainer}>
                    <Text>Количество багажа</Text>
                    <Text>{rate.back_size}</Text>
                </Container>
                <Text>{rate.text}</Text>

                <Container style={styles.tableContainer}>
                    <Text>Марки машин</Text>
                    <Text>{cars}</Text>
                </Container>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        minHeight: 100,
        height: 140,
        flex: 0.1,
    },
    tableContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});