import React, {Component} from 'react'
import {Text, StyleSheet, View, ListView, FlatList, TextInput} from 'react-native'
import SearchResult from "./searchResultComponent";
import axios from "axios/index";
import Icon from "react-native-vector-icons/EvilIcons";


export default class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            searchText: "",
        }
        this.findDestinationAddress = this.findDestinationAddress.bind(this)
        this.setLocation = this.setLocation.bind(this)
    }

    setLocation(element) {
        this.setState({data: [], searchText: ""})
        this.props.parent.setLocation(element)
    }


    findDestinationAddress(search) {
        this.setState({searchText: search})
        let SEARCH_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=Казань%20{a}&language=ru";
        if (search.length > 4) {
            axios.get(SEARCH_URL.replace('{a}', search))
                .then((resp) => {
                    let data = resp.data.results.filter((item, index) => {
                        return item.types.contains('street_address')
                    })
                    if (data.length > 0) {
                        let street_name, street_number;
                        let results = data.map((item, ind) => {
                            street_name = item.address_components.filter((obj, index) => {
                                return obj.types.contains('route');
                            })
                            street_number = item.address_components.filter((obj, index) => {
                                return obj.types.contains('street_number');
                            })
                            return {
                                key: ind,
                                street_name: street_name[0].short_name,
                                street_number: street_number[0].short_name,
                                street_name_numb: street_name[0].short_name + ", " + street_number[0].short_name,
                                geometry: item.geometry,
                            }
                        });
                        this.setState({data: results});
                    }
                })
                .catch((resp) => {
                    console.log(resp)
                })
        } else {
            this.setState({data: []})
        }
    }

    render() {
        let display = Object.keys(this.state.data).length > 0 ? "flex" : "none";

        let main = {
            display: display,
            flex: 0.234,
            elevation: 1,
            marginLeft: '10%',
            width: '100%',
        }
        return (
            <View style={styles.allNonMapThings}>
                <View style={styles.inputContainer}>
                    <Icon style={styles.searchIcon} name="search" size={30} color="#000"/>
                    <TextInput
                        placeholder={"Куда?"}
                        style={styles.input}
                        value={this.state.searchText}
                        onChangeText={(text) => this.findDestinationAddress(text)}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={main}>
                    <View style={styles.container}>
                        <FlatList
                            style={styles.results}
                            data={this.state.data}
                            renderItem={({item}) => <SearchResult
                                name={item.street_name_numb}
                                object={item}
                                parent={this}
                            />}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        elevation: 1,
    },

    searchIcon: {
        marginTop: 6,
    },

    allNonMapThings: {
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    input: {
        height: 40,
        width: '90%',
        marginLeft: 5,
        marginRight: 5,

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
    results: {
        flex: 1,
        height: 20,
        flexDirection: "column",
        width: '90%',
        marginTop: '5%',
        marginLeft: '0%',
        elevation: 1,
        backgroundColor: "#fefefe",
        padding: 3,
    }
})