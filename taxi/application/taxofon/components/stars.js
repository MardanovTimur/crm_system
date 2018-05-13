import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Col, Container, Grid, Text} from "native-base";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

var _ = require('lodash');

/**********************
 * Returns stars grid *
 * ********************/
export default class Stars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedInd: -1
        };
        this.pressStar = this.pressStar.bind(this);
    }

    pressStar(selectedInd) {
        this.setState({selectedInd})
        this.props.parent.getStar(selectedInd);
    }

    getStars() {
        let stars = _.range(this.props.size).map((item, index) => {
            return (
                <Col key={index} style={styles.col_star}>
                    <MaterialIcon size={40} onPress={() => {
                        this.pressStar(index)
                    }} name={this.state.selectedInd >= index ? 'star' : 'star-border'}
                               style={styles.starIconStyle}/>
                </Col>
            )
        });
        console.log(stars);
        return (
            <Grid style={styles.gridStars}>
                {stars}
            </Grid>
        )
    }


    render() {
        let stars = this.getStars();
        return stars;
    }


}

const styles = StyleSheet.create({
    col_star: {
        width: '100%',
    },
    starIconStyle: {
        color: '#eaec33',
    },
    gridStars: {
        alignItems: "center",
        justifyContent: "center",
    }
});