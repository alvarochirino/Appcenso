import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const myIcon1 = <Icon name="at-sign" size={18} />;
const myIcon2 = <Icon name="clock" size={18} />;
const myIcon3 = <Icon name="map-pin" size={18} />;

export default function informacion(props) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {myIcon1}
                <Text>Correo electronico</Text>
            </View>
            <View style={styles.row}>
                {myIcon2}
                <Text>Horario de atención</Text>
            </View>
            <View style={styles.row}>
                {myIcon3}
                <Text>Ubicacion</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
      container: {
        marginHorizontal: 15,
        marginVertical: 10,
      },
      row: {
        flexDirection: 'row',
      },
})