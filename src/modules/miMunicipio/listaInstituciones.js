import React, {Component} from 'react';
import {FlatList} from 'react-native';

import Institucion from './institucion';
import API from '../../../utils/api';

export default class ViewListaInstituciones extends Component {
  state = {
    instituciones: [],
  };

  async componentDidMount () {
    const instituciones = await API.getInstituciones (this.props.id);
    if (instituciones != null) {
      //console.log('instituciones', instituciones)
      this.setState ({instituciones});
    }
  }

  renderItem = ({item}) => {
    return <Institucion {...item} />;
  };

  render () {
    return (
      <FlatList
        keyExtractor={item => item.id.toString ()}
        data={this.state.instituciones}
        renderItem={this.renderItem}
      />
    );
  }
}
