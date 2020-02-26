import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import Opciones from '../../components/opciones'

export default class Institucion extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text
                        style={styles.text}
                    >
                        {this.props.nombre}
                    </Text>
                </View>
                <View style={styles.rigth}>
                    <Opciones informacion={this.props} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
    },
    left: {
        flex: 50,
        justifyContent: 'center',
    },
    rigth: {
        flex: 50,
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        fontSize: 16,
        marginHorizontal: 5,
    },

});