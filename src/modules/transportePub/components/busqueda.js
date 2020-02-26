import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import Maps from './maps';
import API from '../../../../utils/api';

const width = Dimensions.get("window").width - 10;

export default class Busqueda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaTransp: [],
            linea: null,
        };
    }

    async componentDidMount() {

        var listaTransp = await API.getTransportePub();
        for (var i = 0; i < listaTransp.length; i++) {
            listaTransp[i].value = "Linea " + listaTransp[i].linea + ": " + listaTransp[i].inicio + " - " + listaTransp[i].final;
        }
        var file = { "id": 0, "value": "Todos" };
        listaTransp.unshift(file);
        if (listaTransp != null) {
            this.setState({
                listaTransp: listaTransp
            });
        }
        console.log(this.state.listaTransp);
    }

    mostrarRuta = (value, index) => {
        console.log(value);
        if (value != "Todos") {
            this.setState({
                linea: this.state.listaTransp[index]
            })
        } else {
            this.setState({
                linea: null
            })
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Dropdown
                    label='Indicar linea'
                    fontSize={16}
                    textColor={"rgb(0, 0, 0)"}
                    data={this.state.listaTransp}
                    onChangeText={this.mostrarRuta}
                    containerStyle={{ height: 60 }}
                />
                <View style={styles.map}>
                    <Maps listaTransp={this.state.listaTransp} linea={this.state.linea} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        paddingHorizontal: 5,
    },
    map: {
        height: width + 50,
        marginVertical: 5,
    },

})