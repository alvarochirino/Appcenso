import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StackedBarChart} from 'react-native-svg-charts';

export default class porcentajeBar extends Component {
  render () {
    const {porcentaje, tramite} = this.props;
    const {estado, observacion} = tramite;
    const data = [
      {
        diasRestantes: porcentaje,
        diasPasados: 100 - porcentaje,
      },
    ];
    let colors;
    let estilo = 3;
    if (estado === 'SUSPENDIDO' || estado === 'OBSERVADO') {
      colors = ['#f00', '#fff'];
      estilo = 1;
    } else if (estado === 'FINALIZADO' || estado === 'PARA ENTREGAR') {
      colors = ['#32cd32', '#fff'];
      estilo = 2;
    } else {
      colors = ['#ffbe00', '#ff8e00'];
    }
    const keys = ['diasRestantes', 'diasPasados'];
    return (
      <View style={styles.container}>
        <Text
          style={
            estilo === 1
              ? styles.suspendido
              : estilo === 2 ? styles.finalizado : styles.enCurso
          }
        >
          Estado: {tramite[0].estado}
        </Text>
        <StackedBarChart
          horizontal
          style={{height: 40}}
          keys={keys}
          colors={colors}
          data={data}
          showGrid={false}
          contentInset={{top: 0, bottom: 0}}
        >
          <View style={styles.containerBar}>
            {estado === 'SUSPENDIDO' || estado === 'OBSERVADO'
              ? <Text style={styles.txtBar}> --- </Text>
              : <Text style={styles.txtBar}>{porcentaje} %</Text>}
          </View>
        </StackedBarChart>

        {observacion != null
          ? <Text style={styles.txt}>
              Observación: {observacion}
            </Text>
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    padding: 10,
    margin: 10,
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
  enCurso: {
    fontSize: 16,
    textAlign: 'center',
  },
  suspendido: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  finalizado: {
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
  },
});
