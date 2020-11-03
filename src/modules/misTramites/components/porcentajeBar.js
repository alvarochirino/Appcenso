import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackedBarChart} from 'react-native-svg-charts';

export default class porcentajeBar extends Component {
  render () {
    const {numero, estado, observacion, porcentaje} = this.props.tramite;
    const data = [
      {
        diasRestantes: porcentaje,
        diasPasados: 100 - porcentaje,
      },
    ];
    let colors;
    let estilo;
    if (estado === 'SUSPENDIDO' || estado === 'Suspendido') {
      colors = ['#e74e1f', '#e74e12'];
      estilo = 1;
    } else if (estado === 'OBSERVADO' || estado === 'Observado') {
      colors = ['#ff8e00', '#ffbe00'];
      estilo = 2;
    } else {
      colors = ['#029006', '#a7efa9'];
      estilo = 3;
    }
    const keys = ['diasRestantes', 'diasPasados'];
    return (
      <View style={styles.container}>
        <Text style={styles.txt}>
          Número de tramite: {numero}
        </Text>
        <Text style={styles.txt}> Estado: </Text>
        <Text
          style={
            estilo === 1
              ? styles.suspendido
              : estilo === 2 ? styles.observado : styles.txt
          }
        >
          {estado}
        </Text>
        <StackedBarChart
          horizontal
          style={{height: 40, width: '80%'}}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{top: 0, bottom: 0}}
        >
          <View style={styles.containerBar}>
            {estado === 'SUSPENDIDO' || estado === 'Suspendido'
              ? <Text style={styles.txtBar}> --- </Text>
              : <Text style={styles.txtBar}>{porcentaje} %</Text>}
          </View>
        </StackedBarChart>
        {observacion !== '' &&
          <Text style={styles.txt}>Observación: {observacion}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    width: '95%',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  containerBar: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  txtBar: {
    padding: 2,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'ConthraxSb-Regular',
    fontSize: 13,
  },
  txt: {
    fontSize: 16,
    textAlign: 'center',
  },
  suspendido: {
    fontSize: 16,
    textAlign: 'center',
    color: '#e74e1f',
  },
  observado: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ff8e00',
  },
});
