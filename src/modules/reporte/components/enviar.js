import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class Enviar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boton: false
        };
    }

    onPress = () => this.setState({
        boton: true
    })

    render() {
        let verTexto1
        let verTexto2
        if (this.state.boton) {
            verTexto1 = <Text style={styles.text}>Gracias por su aporte</Text>
            verTexto2 = <Text style={styles.text}>Su reporte sera atendido en la brevedad posible</Text>
        }

        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.up}>
                        <View style={styles.left}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.onPress}>
                                <Text style={styles.text}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.right}>
                            {verTexto1}
                        </View>
                    </View>
                    <View>
                        {verTexto2}
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column'
    },
    right: {
        flex: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        flex: 30,
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        margin: 3,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    up: {
        flexDirection: 'row',
        marginBottom: 5,
    },
})