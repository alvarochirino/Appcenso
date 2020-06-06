import React, {Component} from 'react';
import {View, FlatList, ScrollView, Text, StyleSheet} from 'react-native';

import API from 'pruebas/utils/api';
import Sintoma from './components/Sintoma';
import AppButton from 'pruebas/src/components/AppButton';

class DiagnosticoList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      diagnosticos: null,
      explicaciones: [],
    };
    global.resultadoSum = [0, 0];
  }

  async componentDidMount () {
    let explicaciones = [];
    const diagnosticos = await API.getDiagnosticos ();
    if (diagnosticos != null) {
      diagnosticos.map (item => {
        if (item.explicacion) {
          const fila = {id: item.numero, explicac: item.explicacion};
          explicaciones.push (fila);
        }
      });
      this.setState ({diagnosticos, explicaciones});
    }
  }

  renderItem = ({item}) => {
    return <Sintoma {...item} />;
  };

  renderItem2 = ({item}) => {
    return <Text style={styles.txt}>{item.id}. {item.explicac}</Text>;
  };

  _diagnostico = async () => {
    console.warn (global.resultadoSum);
    let resultadoAPI;
    if (global.resultadoSum[0] >= global.resultadoSum[1]) {
      resultadoAPI = await API.getResultado (1, global.resultadoSum[0]);
    } else {
      resultadoAPI = await API.getResultado (2, global.resultadoSum[1]);
    }
    if (global.resultadoSum[0] > 0 || global.resultadoSum[1] > 0) {
      this.props.navigation.navigate ('Diagnostico', {
        idEnfermedad: resultadoAPI.id_enferm,
        resultado: resultadoAPI,
      });
    }
  };

  /*   _mensaje = (id, resultadoAPI) => {
    Alert.alert (
      'Resultado',
      resultadoAPI.resultado,
      [
        {text: 'Cancelar'},
        {
          text: 'Continuar',
          onPress: () => {
            this.props.navigation.navigate ('Enfermedad', {idEnfermedad: id});
          },
        },
      ],
      {cancelable: false}
    );
  }; */

  render () {
    const {diagnosticos, explicaciones} = this.state;
    return (
      <ScrollView style={styles.container}>
        {diagnosticos &&
          <View>
            <Text style={styles.txt}>
              Especifique los sintomas presentes marcando a la derecha.
            </Text>
            <FlatList
              keyExtractor={item => item.id.toString ()}
              data={diagnosticos}
              renderItem={this.renderItem}
            />
            <View style={styles.containerCenter}>
              <AppButton
                title="DIAGNOSTICO POR DESCARTE*"
                action={() => this._diagnostico ()}
                color={'rgb(38, 168, 193)'}
              />
            </View>
            <Text style={styles.txt2}>
              * Tomando en cuenta las posibles enfermedades tropicales el sistema trabaja por descarte,
              {' '}
              estableciendo un patron de sintomas entre covid-19 y dengue.
            </Text>
            <FlatList
              keyExtractor={item => item.id.toString ()}
              data={explicaciones}
              renderItem={this.renderItem2}
            />
          </View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  containerCenter: {
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
  txt2: {
    fontSize: 12,
    color: 'black',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  txt3: {
    fontSize: 11,
    marginHorizontal: 10,
  },
});

export default DiagnosticoList;
