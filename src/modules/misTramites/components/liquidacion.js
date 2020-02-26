import React from 'react';
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/Feather';

const myIcon = <Icon name="clock" size={20} color="#900" />;

const img = <Image source={require('../../../../assets/gallery.png')} style={{ width: 20, height: 20 }} />

export default function Liquidacion(props) {
    state = {
        liquidacion: {
            impuesto: 200,
            multa: 10,
            int: 7
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.text}>INMUEBLE</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>3GT5SDRTT</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.text}>Impuesto</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>200</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.text}>Multa</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>10</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.text}>Interes</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>7</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.text}>TOTAL A PAGAR</Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>217</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        padding: 5,
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        margin: 5,
        textAlign: 'center',
    },
    right: {
        flex: 60,
        justifyContent: 'center'
    },
    left: {
        flex: 40,
        justifyContent: 'center',
    },
})