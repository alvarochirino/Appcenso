import React, {Component} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import API from 'pruebas/utils/api';
import Sintoma from './components/Sintoma';
import AppButton from 'pruebas/src/components/AppButton';

class DiagnosticoList extends Component {
  constructor (props) {
    super (props);
    this.state = {
      diagnosticos: null,
    };
    global.resultadoSum = [0, 0];
  }

  async componentDidMount () {
    const diagnosticos = await API.getDiagnosticos ();
    if (diagnosticos != null) {
      this.setState ({diagnosticos});
    }
  }

  renderItem = ({item}) => {
    return <Sintoma {...item} />;
  };

  renderItem2 = ({item}) => {
    if (item.numero === 0) return null;
    return <Text style={styles.txt}>{item.numero}. {item.explicacion} </Text>;
  };

  _diagnostico = () => {
    console.log (global.resultadoSum);
    if (global.resultadoSum[0] >= global.resultadoSum[1]) {
      Alert.alert ('covid');
    } else {
      Alert.alert ('dengue');
    }
  };

  render () {
    const {diagnosticos} = this.state;
    return (
      <ScrollView style={styles.container}>
        {diagnosticos &&
          <View>
            <Text style={styles.txt}>
              Especifique los sintomas presentes marcado a la derecha*
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
              Tomando en cuenta las posibles enfermedades tropicales el sistema trabaja por descarte,
              {' '}
              estableciendo un patron de sintomas entre covid-19, h1n1, dengue, bronquitis y resfrio.
            </Text>
            <FlatList
              keyExtractor={item => item.id.toString ()}
              data={diagnosticos}
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
});

export default DiagnosticoList;
